'use client';
import React, { useMemo, useState } from 'react';
import { InputField } from './InputField';
import { PERSON_FORM_FIELDS } from '@/data/formData';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

type PersonState = Record<string, string>;

export const PersonForm: React.FC = () => {
    const initial = useMemo(
        () => Object.fromEntries(PERSON_FORM_FIELDS.map((f) => [f.id, ''])) as PersonState,
        []
    );

    const [data, setData] = useState<PersonState>(initial);
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [submitted, setSubmitted] = useState<PersonState | null>(null);

    const handleValueChange = (id: string, val: string) => {
        setData((prev) => ({ ...prev, [id]: val }));
    };

    const handleValidationError = (id: string, err: string | null) => {
        setErrors((prev) => ({ ...prev, [id]: err }));
    };

    const hasErrors = Object.values(errors).some((e) => !!e);
    const allFilled = Object.values(data).every((v) => v.trim() !== '');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasErrors && allFilled) setSubmitted(data);
    };

    const reset = () => {
        setData(initial);
        setErrors({});
        setSubmitted(null);
    };

    return (
        <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-blue-50 via-pink-50 to-rose-50">
            <div className="max-w-3xl mx-auto">
                <div className="p-8 rounded-2xl shadow-xl bg-white border border-slate-100">
                    <header className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
                            Validated form demo
                        </h1>
                        <span className="mt-1 text-sm text-slate-500">
                            By{' '}
                        <Link href="https://github.com/imflawlezz" className="underline text-purple-400">imflawlezz</Link>
                        </span>
                    </header>

                    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {PERSON_FORM_FIELDS.map((f) => (
                            <InputField
                                key={f.id}
                                id={f.id}
                                value={data[f.id]}
                                type={f.type}
                                minChars={f.minChars}
                                maxChars={f.maxChars}
                                minValue={f.minValue}
                                maxValue={f.maxValue}
                                placeholder={f.label}
                                onValueChange={(val) => handleValueChange(f.id, String(val))}
                                onValidationError={(err) => handleValidationError(f.id, err)}
                            >
                                {f.label}
                            </InputField>
                        ))}

                        <div className="md:col-span-2 flex flex-col md:flex-row gap-3 mt-2">
                            <button
                                type="submit"
                                disabled={hasErrors || !allFilled}
                                className={`flex-1 py-3 rounded-lg font-medium transition 
                  ${
                                    hasErrors || !allFilled
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-sky-200 to-teal-200 text-slate-900 hover:scale-[1.01] shadow-md'
                                }`}
                            >
                                Submit
                            </button>

                            <button
                                type="button"
                                onClick={reset}
                                className="flex-1 py-3 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                            >
                                Reset
                            </button>
                        </div>
                    </form>

                    {submitted && (
                        <div className="mt-6 p-4 rounded-md bg-teal-50 border border-teal-100 flex items-start gap-3">
                            <CheckCircle2 className="text-teal-600" />
                            <div className="flex-1">
                                <p className="font-medium text-teal-700">Form submitted successfully!</p>
                                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                    {Object.entries(submitted).map(([k, v]) => {
                                        const field = PERSON_FORM_FIELDS.find((f) => f.id === k);
                                        return (
                                            <div key={k} className="flex justify-between">
                                                <span className="text-slate-500">{field?.label}</span>
                                                <span className="font-medium text-slate-800">{v}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
