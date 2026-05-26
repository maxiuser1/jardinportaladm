import { Component, inject, signal, Input, Output, EventEmitter, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Subject, of } from 'rxjs';
import { debounceTime, switchMap, catchError, filter } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../../environments/environment';
import { FormValueControl } from '@angular/forms/signals';
import { GEO_CHI } from '../../data/geo';

@Component({
  selector: 'gcalle',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  templateUrl: './calle.html',
  styleUrl: './calle.scss',
})
export class CalleComponent implements FormValueControl<string> {

  value = model('');

  @Output() direccionLocalizada = new EventEmitter<{ calle: string; numero: string; region: string; comuna: string; ciudad: string }>();

  private http = inject(HttpClient);


  calleInput$ = new Subject<string>();

  sugerenciasCalle = toSignal(
    this.calleInput$.pipe(
      filter(val => val.length > 3),
      debounceTime(400),
      switchMap(input => {
        const url = `${environment.api}bo/geolocalizar?input=${encodeURIComponent(input)}`;
        return this.http.get<any>(url).pipe(
          catchError(() => of({ suggestions: [] }))
        );
      })
    ),
    { initialValue: { suggestions: [] } }
  );

  onCalleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.calleInput$.next(target.value);
  }

  onOptionSelected(event: any, sug: any) {
    console.log('onOptionSelected', sug);
    if (event.isUserInput) {
      this.onCalleSelected(sug);
    }
  }

  onCalleSelected(sug: any) {
    console.log('onCalleSelected', sug);
    const mainText = sug.placePrediction.structuredFormat.mainText.text;
    this.value.set(mainText);

    const placeId = sug.placePrediction.placeId;
    if (placeId) {
      const url = `${environment.api}bo/geoLocalizado?id=${encodeURIComponent(placeId)}`;
      this.http.get<any>(url).subscribe({
        next: (data) => {
          if (data && data.addressComponents) {
            const details = this.findAddressDetails(data.addressComponents);
            this.direccionLocalizada.emit(details);
            this.value.set(details.calle);
          }
        },
        error: (err) => {
          console.error('Error al obtener detalles de la dirección', err);
        }
      });
    }
  }

  private findAddressDetails(addressComponents: any[]) {
    let streetNumber = '';
    let route = '';
    let googleComuna = '';
    let googleRegion = '';
    let googleCiudad = '';

    for (const comp of addressComponents) {
      const types = comp.types || [];
      if (types.includes('street_number')) {
        streetNumber = comp.longText || comp.shortText || '';
      } else if (types.includes('route')) {
        route = comp.longText || comp.shortText || '';
      } else if (types.includes('administrative_area_level_3')) {
        googleComuna = comp.longText || comp.shortText || '';
      } else if (types.includes('locality') && !googleComuna) {
        googleComuna = comp.longText || comp.shortText || '';
      } else if (types.includes('administrative_area_level_1')) {
        googleRegion = comp.longText || comp.shortText || '';
      } else if (types.includes('administrative_area_level_2') && !googleCiudad) {
        googleCiudad = comp.longText || comp.shortText || '';
      }
    }

    let matchedRegion = '';
    let matchedComuna = '';

    const normalize = (str: string) => {
      return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, " ")
        .trim();
    };

    console.log('googleRegion', googleRegion);
    console.log('googleComuna', googleComuna);
    const normGoogleRegion = googleRegion ? normalize(googleRegion) : '';
    const normGoogleComuna = googleComuna ? normalize(googleComuna) : '';

    if (googleRegion) {
      let bestRegion = GEO_CHI.find(r => {
        const normReg = normalize(r.region);
        return normReg.includes(normGoogleRegion) || normGoogleRegion.includes(normReg);
      });
      console.log('bestRegion', bestRegion);

      if (!bestRegion && (normGoogleRegion.includes('metropolitana') || normGoogleRegion.includes('santiago'))) {
        bestRegion = GEO_CHI.find(r => normalize(r.region).includes('metropolitana'));
      }

      console.log('bestRegion2', bestRegion);
      if (bestRegion) {
        matchedRegion = bestRegion.region;
        if (googleComuna) {
          const foundComuna = bestRegion.comunas.find(c => {
            const normC = normalize(c);
            return normC === normGoogleComuna || normC.includes(normGoogleComuna) || normGoogleComuna.includes(normC);
          });
          if (foundComuna) {
            matchedComuna = foundComuna;
          }
        }
      }
    }
    console.log('matchedRegion', matchedRegion);
    console.log('matchedComuna', matchedComuna);

    if (!matchedComuna && googleComuna) {
      for (const r of GEO_CHI) {
        const foundComuna = r.comunas.find(c => {
          const normC = normalize(c);
          return normC === normGoogleComuna || normC.includes(normGoogleComuna) || normGoogleComuna.includes(normC);
        });
        if (foundComuna) {
          matchedComuna = foundComuna;
          if (!matchedRegion) {
            matchedRegion = r.region;
          }
          break;
        }
      }
    }


    return {
      calle: route,
      numero: streetNumber,
      region: matchedRegion,
      comuna: matchedComuna,
      ciudad: googleCiudad
    };
  }
}
