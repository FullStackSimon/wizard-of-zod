import { describe, it, expect } from 'vitest'
import {beautifyObjectName, cn} from "../../../src/lib/utils";

describe('cn function', () => {
    it('should merge class names correctly', () => {
        const result = cn('bg-red-500', 'text-white', 'p-4')
        expect(result).toBe('bg-red-500 text-white p-4')
    })

    it('should remove duplicate class names and prioritize later ones', () => {
        const result = cn('bg-red-500', 'bg-blue-500', 'text-white')
        expect(result).toBe('bg-blue-500 text-white')
    })

    it('should handle conditional class names', () => {
        const result = cn('bg-red-500', false && 'hidden', 'text-white')
        expect(result).toBe('bg-red-500 text-white')
    })

    it('should handle undefined or null values gracefully', () => {
        const result = cn('bg-red-500', null, undefined, 'text-white')
        expect(result).toBe('bg-red-500 text-white')
    })
})

describe('beautifyObjectName function', () => {
    it('should remove array indices and add spaces before uppercase letters', () => {
        const result = beautifyObjectName('myObjectName[0]')
        expect(result).toBe('My Object Name')
    })

    it('should capitalize the first letter of the string', () => {
        const result = beautifyObjectName('myObjectName')
        expect(result).toBe('My Object Name')
    })

    it('should handle strings with no uppercase letters', () => {
        const result = beautifyObjectName('objectname')
        expect(result).toBe('Objectname')
    })

    it('should handle strings with multiple array indices', () => {
        const result = beautifyObjectName('myObjectName[0][1]')
        expect(result).toBe('My Object Name')
    })

    it('should return an empty string unchanged', () => {
        const result = beautifyObjectName('')
        expect(result).toBe('')
    })
})
