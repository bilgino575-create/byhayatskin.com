'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

interface ConsultationEngineProps {
  dict: DictionaryType
  lang: Locale
}

type Step = 'skin_type' | 'concerns' | 'age_group' | 'lifestyle' | 'climate' | 'goals' | 'result'

const skinTypes = [
  { key: 'dry', icon: '💧', label: 'Dry Skin', desc: 'Lacks moisture, feels tight' },
  { key: 'oily', icon: '✨', label: 'Oily Skin', desc: 'Excess sebum, prone to shine' },
  { key: 'combination', icon: '⚖️', label: 'Combination', desc: 'Oily T-zone, dry cheeks' },
  { key: 'sensitive', icon: '🌸', label: 'Sensitive', desc: 'Reactive, easily irritated' },
  { key: 'acne', icon: '🎯', label: 'Acne-Prone', desc: 'Frequent breakouts' },
]

const concerns = [
  { key: 'hydration', label: 'Hydration', icon: '💧' },
  { key: 'anti_aging', label: 'Anti-Aging', icon: '✧' },
  { key: 'pigmentation', label: 'Pigmentation', icon: '◐' },
  { key: 'acne', label: 'Acne & Blemishes', icon: '◆' },
  { key: 'sensitivity', label: 'Sensitivity', icon: '🌸' },
  { key: 'pores', label: 'Enlarged Pores', icon: '◎' },
  { key: 'dullness', label: 'Dullness', icon: '☀' },
  { key: 'barrier', label: 'Barrier Repair', icon: '⬡' },
]

const ageGroups = [
  { key: 'teens', label: 'Teens (13–19)', icon: '🌱', desc: 'Focus on acne prevention & gentle care' },
  { key: '20s', label: '20s', icon: '✦', desc: 'Prevention, hydration & glow' },
  { key: '30s', label: '30s', icon: '◈', desc: 'Early anti-aging & brightening' },
  { key: '40s', label: '40s', icon: '◉', desc: 'Firming, lifting & deep hydration' },
  { key: '50plus', label: '50+', icon: '✧', desc: 'Intensive anti-aging & barrier support' },
]

const lifestyles = [
  { key: 'outdoor', label: 'Outdoor / Active', icon: '🌿' },
  { key: 'office', label: 'Office / Indoor', icon: '💼' },
  { key: 'mixed', label: 'Mixed Lifestyle', icon: '⚖️' },
  { key: 'travel', label: 'Frequent Traveler', icon: '✈️' },
]

const climateFactors = [
  { key: 'dubai_heat', label: 'Dubai Summer Heat', icon: '☀' },
  { key: 'ac_exposure', label: 'Heavy AC Exposure', icon: '❄' },
  { key: 'humidity', label: 'High Humidity', icon: '💧' },
  { key: 'dust', label: 'Dust & Pollution', icon: '🌫' },
]

const goals = [
  { key: 'glow', label: 'Healthy Glow', icon: '✨' },
  { key: 'anti_age', label: 'Anti-Aging', icon: '✧' },
  { key: 'clear', label: 'Clear Skin', icon: '◎' },
  { key: 'hydrate', label: 'Deep Hydration', icon: '💧' },
  { key: 'even', label: 'Even Skin Tone', icon: '◐' },
  { key: 'protect', label: 'Protection', icon: '⬡' },
]

const steps: Step[] = ['skin_type', 'concerns', 'age_group', 'lifestyle', 'climate', 'goals', 'result']
const stepLabels: Record<Step, string> = {
  skin_type: 'Skin Type',
  concerns: 'Concerns',
  age_group: 'Age Group',
  lifestyle: 'Lifestyle',
  climate: 'Climate',
  goals: 'Goals',
  result: 'Your Plan',
}

export function ConsultationEngine({ dict, lang }: ConsultationEngineProps) {
  const [currentStep, setCurrentStep] = useState<Step>('skin_type')
  const [selections, setSelections] = useState<Record<string, string | string[]>>({
    skin_type: '',
    concerns: [],
    age_group: '',
    lifestyle: '',
    climate: [],
    goals: [],
  })

  const stepIndex = steps.indexOf(currentStep)
  const progress = (stepIndex / (steps.length - 1)) * 100

  const toggleMulti = (field: string, value: string) => {
    setSelections((prev) => {
      const current = (prev[field] as string[]) || []
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      }
    })
  }

  const setSingle = (field: string, value: string) => {
    setSelections((prev) => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    if (currentStep === 'skin_type') return !!selections.skin_type
    if (currentStep === 'concerns') return (selections.concerns as string[]).length > 0
    if (currentStep === 'age_group') return !!selections.age_group
    if (currentStep === 'lifestyle') return !!selections.lifestyle
    if (currentStep === 'climate') return (selections.climate as string[]).length > 0
    if (currentStep === 'goals') return (selections.goals as string[]).length > 0
    return true
  }

  const next = () => {
    const idx = steps.indexOf(currentStep)
    if (idx < steps.length - 1) setCurrentStep(steps[idx + 1])
  }

  const back = () => {
    const idx = steps.indexOf(currentStep)
    if (idx > 0) setCurrentStep(steps[idx - 1])
  }

  // Build WhatsApp message from selections
  const buildWhatsAppMessage = () => {
    const msg = [
      'Hi, I completed the skin consultation:',
      `Skin Type: ${selections.skin_type}`,
      `Age Group: ${selections.age_group}`,
      `Concerns: ${(selections.concerns as string[]).join(', ')}`,
      `Lifestyle: ${selections.lifestyle}`,
      `Climate Factors: ${(selections.climate as string[]).join(', ')}`,
      `Goals: ${(selections.goals as string[]).join(', ')}`,
      'Please send me my personalized skincare plan.',
    ].join('\n')
    return encodeURIComponent(msg)
  }

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-28 pb-20">
      <div className="container-luxury max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)]">
              {dict.consultation.label}
            </span>
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
          </div>
          <h1 className="heading-luxury text-4xl text-[var(--color-matte-black)] mb-2">
            {dict.consultation.headline}
          </h1>
          <p className="text-[var(--color-warm-gray)] text-sm max-w-md mx-auto">
            {dict.consultation.subheadline}
          </p>
        </div>

        {/* Progress */}
        {currentStep !== 'result' && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3 overflow-x-auto gap-2">
              {steps.slice(0, -1).map((step, i) => (
                <div
                  key={step}
                  className={`text-[0.55rem] tracking-[0.08em] uppercase whitespace-nowrap transition-colors duration-300 ${
                    i <= stepIndex ? 'text-[var(--color-champagne-dark)]' : 'text-[var(--color-warm-gray)]/40'
                  }`}
                >
                  {stepLabels[step]}
                </div>
              ))}
            </div>
            <div className="h-0.5 bg-[var(--color-soft-gray)] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--color-champagne-dark), var(--color-champagne))' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className="text-right mt-1 text-[0.6rem] text-[var(--color-warm-gray)]">
              Step {stepIndex + 1} of {steps.length - 1}
            </div>
          </div>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
          >
            {/* STEP 1: Skin Type */}
            {currentStep === 'skin_type' && (
              <div>
                <h2 className="heading-luxury text-2xl text-[var(--color-matte-black)] mb-6 text-center">
                  {dict.consultation.steps.skin_type}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {skinTypes.map((type) => (
                    <button
                      key={type.key}
                      onClick={() => setSingle('skin_type', type.key)}
                      className={`p-5 rounded-sm text-left border transition-all duration-300 ${
                        selections.skin_type === type.key
                          ? 'border-[var(--color-champagne)] bg-[var(--color-champagne)]/5 shadow-[var(--shadow-luxury)]'
                          : 'border-[var(--color-soft-gray)] bg-[var(--color-pearl)] hover:border-[var(--color-champagne-light)]'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="text-sm font-medium text-[var(--color-matte-black)] mb-1">{type.label}</div>
                      <div className="text-[0.7rem] text-[var(--color-warm-gray)]">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Concerns */}
            {currentStep === 'concerns' && (
              <div>
                <h2 className="heading-luxury text-2xl text-[var(--color-matte-black)] mb-2 text-center">
                  {dict.consultation.steps.concerns}
                </h2>
                <p className="text-center text-sm text-[var(--color-warm-gray)] mb-6">Select all that apply</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {concerns.map((c) => {
                    const selected = (selections.concerns as string[]).includes(c.key)
                    return (
                      <button
                        key={c.key}
                        onClick={() => toggleMulti('concerns', c.key)}
                        className={`p-4 rounded-sm text-center border transition-all duration-300 relative ${
                          selected
                            ? 'border-[var(--color-champagne)] bg-[var(--color-champagne)]/5'
                            : 'border-[var(--color-soft-gray)] bg-[var(--color-pearl)] hover:border-[var(--color-champagne-light)]'
                        }`}
                      >
                        {selected && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[var(--color-champagne)] flex items-center justify-center">
                            <Check size={10} className="text-white" />
                          </div>
                        )}
                        <div className="text-xl mb-1">{c.icon}</div>
                        <div className="text-[0.7rem] text-[var(--color-matte-black)]">{c.label}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Age Group */}
            {currentStep === 'age_group' && (
              <div>
                <h2 className="heading-luxury text-2xl text-[var(--color-matte-black)] mb-2 text-center">
                  Age Group
                </h2>
                <p className="text-center text-sm text-[var(--color-warm-gray)] mb-6">
                  Your age helps us tailor the right ingredients and routine intensity
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ageGroups.map((age) => (
                    <button
                      key={age.key}
                      onClick={() => setSingle('age_group', age.key)}
                      className={`p-5 rounded-sm text-left border transition-all duration-300 flex items-start gap-4 ${
                        selections.age_group === age.key
                          ? 'border-[var(--color-champagne)] bg-[var(--color-champagne)]/5 shadow-[var(--shadow-luxury)]'
                          : 'border-[var(--color-soft-gray)] bg-[var(--color-pearl)] hover:border-[var(--color-champagne-light)]'
                      }`}
                    >
                      <div className="text-2xl shrink-0">{age.icon}</div>
                      <div>
                        <div className="text-sm font-medium text-[var(--color-matte-black)] mb-1">{age.label}</div>
                        <div className="text-[0.7rem] text-[var(--color-warm-gray)] leading-snug">{age.desc}</div>
                      </div>
                      {selections.age_group === age.key && (
                        <div className="ml-auto w-5 h-5 rounded-full bg-[var(--color-champagne)] flex items-center justify-center shrink-0">
                          <Check size={11} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Lifestyle */}
            {currentStep === 'lifestyle' && (
              <div>
                <h2 className="heading-luxury text-2xl text-[var(--color-matte-black)] mb-6 text-center">
                  {dict.consultation.steps.lifestyle}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {lifestyles.map((l) => (
                    <button
                      key={l.key}
                      onClick={() => setSingle('lifestyle', l.key)}
                      className={`p-6 rounded-sm text-center border transition-all duration-300 ${
                        selections.lifestyle === l.key
                          ? 'border-[var(--color-champagne)] bg-[var(--color-champagne)]/5 shadow-[var(--shadow-luxury)]'
                          : 'border-[var(--color-soft-gray)] bg-[var(--color-pearl)] hover:border-[var(--color-champagne-light)]'
                      }`}
                    >
                      <div className="text-3xl mb-3">{l.icon}</div>
                      <div className="text-sm font-medium text-[var(--color-matte-black)]">{l.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Climate */}
            {currentStep === 'climate' && (
              <div>
                <h2 className="heading-luxury text-2xl text-[var(--color-matte-black)] mb-2 text-center">
                  {dict.consultation.steps.climate}
                </h2>
                <p className="text-center text-sm text-[var(--color-warm-gray)] mb-6">Select your main climate challenges</p>
                <div className="grid grid-cols-2 gap-4">
                  {climateFactors.map((c) => {
                    const selected = (selections.climate as string[]).includes(c.key)
                    return (
                      <button
                        key={c.key}
                        onClick={() => toggleMulti('climate', c.key)}
                        className={`p-5 rounded-sm text-center border transition-all duration-300 relative ${
                          selected
                            ? 'border-[var(--color-champagne)] bg-[var(--color-champagne)]/5'
                            : 'border-[var(--color-soft-gray)] bg-[var(--color-pearl)] hover:border-[var(--color-champagne-light)]'
                        }`}
                      >
                        {selected && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[var(--color-champagne)] flex items-center justify-center">
                            <Check size={10} className="text-white" />
                          </div>
                        )}
                        <div className="text-2xl mb-2">{c.icon}</div>
                        <div className="text-sm text-[var(--color-matte-black)]">{c.label}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* STEP 6: Goals */}
            {currentStep === 'goals' && (
              <div>
                <h2 className="heading-luxury text-2xl text-[var(--color-matte-black)] mb-2 text-center">
                  {dict.consultation.steps.goals}
                </h2>
                <p className="text-center text-sm text-[var(--color-warm-gray)] mb-6">What do you want to achieve?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {goals.map((g) => {
                    const selected = (selections.goals as string[]).includes(g.key)
                    return (
                      <button
                        key={g.key}
                        onClick={() => toggleMulti('goals', g.key)}
                        className={`p-4 rounded-sm text-center border transition-all duration-300 relative ${
                          selected
                            ? 'border-[var(--color-champagne)] bg-[var(--color-champagne)]/5'
                            : 'border-[var(--color-soft-gray)] bg-[var(--color-pearl)] hover:border-[var(--color-champagne-light)]'
                        }`}
                      >
                        {selected && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[var(--color-champagne)] flex items-center justify-center">
                            <Check size={10} className="text-white" />
                          </div>
                        )}
                        <div className="text-xl mb-1">{g.icon}</div>
                        <div className="text-[0.75rem] text-[var(--color-matte-black)]">{g.label}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* RESULT */}
            {currentStep === 'result' && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-champagne)]/15 flex items-center justify-center mx-auto mb-6">
                  <Check size={28} className="text-[var(--color-champagne-dark)]" />
                </div>
                <h2 className="heading-luxury text-3xl text-[var(--color-matte-black)] mb-3">
                  Your Personalized Plan is Ready
                </h2>
                <p className="text-[var(--color-warm-gray)] mb-8 max-w-md mx-auto">
                  Based on your profile, we've created a customized skincare routine. Book a consultation with our experts to receive your full plan.
                </p>

                <div className="glass rounded-sm p-6 border border-[var(--color-champagne)]/20 mb-8 text-left">
                  <div className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-champagne-dark)] mb-4">
                    Your Profile Summary
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[var(--color-warm-gray)]">Skin Type: </span>
                      <span className="text-[var(--color-matte-black)] capitalize">{selections.skin_type as string}</span>
                    </div>
                    <div>
                      <span className="text-[var(--color-warm-gray)]">Age Group: </span>
                      <span className="text-[var(--color-matte-black)]">
                        {ageGroups.find(a => a.key === selections.age_group)?.label || selections.age_group as string}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--color-warm-gray)]">Lifestyle: </span>
                      <span className="text-[var(--color-matte-black)] capitalize">{(selections.lifestyle as string).replace('_', ' ')}</span>
                    </div>
                    <div>
                      <span className="text-[var(--color-warm-gray)]">Goals: </span>
                      <span className="text-[var(--color-matte-black)]">
                        {(selections.goals as string[]).join(', ').replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[var(--color-warm-gray)]">Concerns: </span>
                      <span className="text-[var(--color-matte-black)]">
                        {(selections.concerns as string[]).join(', ').replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[var(--color-warm-gray)]">Climate Factors: </span>
                      <span className="text-[var(--color-matte-black)]">
                        {(selections.climate as string[]).join(', ').replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={`https://wa.me/971524502886?text=${buildWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury btn-primary flex items-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Get My Full Plan on WhatsApp
                  </a>
                  <Link
                    href={`/${lang}/products`}
                    className="btn-luxury btn-outline flex items-center gap-2"
                  >
                    Shop Recommended Products
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {currentStep !== 'result' && (
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-[var(--color-soft-gray)]">
            <button
              onClick={back}
              disabled={stepIndex === 0}
              className={`flex items-center gap-2 text-sm transition-all duration-300 ${
                stepIndex === 0
                  ? 'text-[var(--color-warm-gray)]/30 cursor-not-allowed'
                  : 'text-[var(--color-warm-gray)] hover:text-[var(--color-matte-black)]'
              }`}
            >
              <ArrowLeft size={14} />
              {dict.common.back}
            </button>

            <button
              onClick={next}
              disabled={!canProceed()}
              className={`btn-luxury flex items-center gap-2 transition-all duration-300 ${
                canProceed()
                  ? 'btn-primary'
                  : 'bg-[var(--color-soft-gray)] text-[var(--color-warm-gray)] cursor-not-allowed'
              }`}
            >
              {stepIndex === steps.length - 2 ? 'See My Plan' : 'Continue'}
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}