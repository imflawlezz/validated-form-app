'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { InputFieldProps } from '@/types/form';

export const InputField: React.FC<InputFieldProps> = ({
                                                          id,
                                                          children,
                                                          value,
                                                          type = 'text',
                                                          minChars,
                                                          maxChars,
                                                          minValue,
                                                          maxValue,
                                                          placeholder,
                                                          onValueChange,
                                                          onValidationError,
                                                      }) => {
    const [internal, setInternal] = useState<string>(() => String(value ?? ''));

    const validation = useMemo(() => {
        const val = internal.trim();

        if (val === '') return { ok: true, error: null };

        if (type === 'text') {
            if (minChars && val.length < minChars)
                return { ok: false, error: `Minimum ${minChars} characters required` };
            if (maxChars && val.length > maxChars)
                return { ok: false, error: `Maximum ${maxChars} characters allowed` };
            return { ok: true, error: null };
        }

        const num = Number(val);
        if (Number.isNaN(num)) return { ok: false, error: 'Must be a number' };
        if (minValue !== undefined && num < minValue)
            return { ok: false, error: `Minimum value is ${minValue}` };
        if (maxValue !== undefined && num > maxValue)
            return { ok: false, error: `Maximum value is ${maxValue}` };
        return { ok: true, error: null };
    }, [internal, type, minChars, maxChars, minValue, maxValue]);

    useEffect(() => {
        onValidationError?.(validation.error);
    }, [validation.error]);

    useEffect(() => {
        setInternal(String(value ?? ''));
    }, [value]);

    const handleChange = (next: string) => {
        if (type === 'number' && /[^0-9.,\-]/.test(next)) return;

        setInternal(next);
        onValueChange(type === 'number' ? next : next);
    };

    const clear = () => {
        setInternal('');
        onValueChange('');
        onValidationError?.(null);
    };

    const hasError = !!validation.error;
    const showSuccess = !hasError && internal.trim().length > 0;

    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-2">
                {children}
            </label>

            <div className="relative">
                <input
                    id={id}
                    type={type === 'number' ? 'text' : type}
                    inputMode={type === 'number' ? 'decimal' : 'text'}
                    value={internal}
                    placeholder={placeholder ?? `Enter ${children}`}
                    aria-invalid={hasError}
                    onChange={(e) => handleChange(e.target.value)}
                    className={`w-full pr-10 pl-4 py-3 rounded-lg border transition duration-200 focus:outline-none 
            ${
                        hasError
                            ? 'border-red-300 shadow-[0_0_12px_rgba(255,150,150,0.4)]'
                            : showSuccess
                                ? 'border-green-300 shadow-[0_0_12px_rgba(150,255,200,0.4)]'
                                : 'border-slate-200 focus:border-sky-300'
                    }
            bg-gradient-to-b from-white to-slate-50`}
                />

                {internal.length > 0 && (
                    <button
                        type="button"
                        onClick={clear}
                        aria-label="Clear"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-100"
                    >
                        <X size={16} className="text-slate-500" />
                    </button>
                )}

                {hasError && (
                    <AlertCircle
                        size={18}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500"
                    />
                )}
                {showSuccess && (
                    <CheckCircle2
                        size={18}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500"
                    />
                )}
            </div>

            <div className="min-h-[1.25rem] mt-2">
                {hasError && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} /> {validation.error}
                    </p>
                )}
            </div>
        </div>
    );
};
