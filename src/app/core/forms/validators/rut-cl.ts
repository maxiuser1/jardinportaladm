import { SchemaPath, validate } from "@angular/forms/signals";

export function rutCl(path: SchemaPath<string>, options?: { message?: string }) {
    validate(path, ({ value }) => {
        if (!value()) {
            return null;
        }
        const parsed = parseRut(value());
        console.log('validacion xxxxx', parsed);
        if (!parsed.isValid) {
            return {
                kind: 'rutCl',
                message: options?.message || 'Rut no válido',
            };
        }
        return null;
    });
}

interface CleanOptions {
    strict?: boolean
}

export function limpiarRut(rut: string, options: CleanOptions = { strict: true }): string {
    const { strict = true } = options
    const normalized = rut.trim().toUpperCase().replace(/^0+/, '')

    if (strict) {
        return normalized.replace(/[^0-9K]/g, '')
    }

    return normalized.replace(/[.,-]/g, '')
}

function getVerifier(rut: string): string | null {
    const digits = limpiarRut(rut, { strict: false })
    if (!/^[0-9]+$/.test(digits)) {
        return null
    }

    let sum = 0
    let multiplier = 2

    for (let i = digits.length - 1; i >= 0; i--) {
        sum += Number(digits[i]) * multiplier
        multiplier = multiplier === 7 ? 2 : multiplier + 1
    }

    const result = 11 - (sum % 11)

    if (result === 11) return "0"
    if (result === 10) return "K"
    return String(result)
}

interface FormatOptions {
    dots?: string | boolean
    hyphen?: string | boolean
    uppercase?: boolean
}

export function formatearRut(rut: string, options: FormatOptions = {}): string {
    const { dots = '.', hyphen = '-', uppercase = true } = options
    const normalized = limpiarRut(rut, { strict: true })

    if (normalized.length <= 1) {
        return normalized
    }

    const body = normalized.slice(0, -1)
    const verifier = normalized.slice(-1)

    const hyphenSeparator = typeof hyphen === 'string' ? hyphen : hyphen === false ? '' : '-'
    const dotSeparator = typeof dots === 'string' ? dots : dots === false ? '' : '.'
    const formattedBody = dotSeparator
        ? body.replace(/\d(?=(\d{3})+$)/g, `$&${dotSeparator}`)
        : body

    const result = `${formattedBody}${hyphenSeparator}${verifier}`;
    return uppercase ? result : result.toLowerCase()
}

interface ParseResult {
    raw: string
    clean: string
    digits: string
    verifier: string
    expectedVerifier: string | null
    isValid: boolean
}

export function parseRut(rut: string): ParseResult {

    const trimmed = rut?.toString().trim().toUpperCase()

    if (!/^[\d.]+-[0-9K]$/.test(trimmed)) {
        return createEmptyParsed(rut)
    }

    const normalized = limpiarRut(trimmed)

    if (normalized.length < 2) {
        return createEmptyParsed(rut)
    }

    const digits = normalized.slice(0, -1)
    const verifier = normalized.slice(-1)

    if (!/^[0-9]+$/.test(digits) || !/^[0-9K]$/.test(verifier)) {
        return createEmptyParsed(rut)
    }

    const expectedVerifier = getVerifier(digits)

    const isValid = expectedVerifier !== null && expectedVerifier === verifier

    return {
        raw: rut,
        clean: normalized,
        digits,
        verifier,
        expectedVerifier,
        isValid
    }
}

function createEmptyParsed(raw: string): ParseResult {
    return {
        raw,
        clean: '',
        digits: '',
        verifier: '',
        expectedVerifier: null,
        isValid: false
    }
}

export function validarRut(rut: string): boolean {
    return parseRut(rut).isValid
}