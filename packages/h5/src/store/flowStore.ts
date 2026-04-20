import { create } from 'zustand';
import type { SceneId, UserAnswers, GeneratedContent, Template } from '@recruit-poster/shared';

interface FlowState {
  sceneId: SceneId | null;
  answers: UserAnswers;
  stepIndex: number;
  generated: GeneratedContent | null;
  selectedTemplate: Template | null;

  setScene: (s: SceneId) => void;
  setAnswer: (key: string, value: UserAnswers[string]) => void;
  setStep: (i: number) => void;
  setGenerated: (g: GeneratedContent | null) => void;
  setTemplate: (t: Template | null) => void;
  reset: () => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  sceneId: null,
  answers: {},
  stepIndex: 0,
  generated: null,
  selectedTemplate: null,

  setScene: (s) => set({ sceneId: s, answers: {}, stepIndex: 0, generated: null, selectedTemplate: null }),
  setAnswer: (key, value) => set((state) => ({
    answers: { ...state.answers, [key]: value },
  })),
  setStep: (i) => set({ stepIndex: i }),
  setGenerated: (g) => set({ generated: g }),
  setTemplate: (t) => set({ selectedTemplate: t }),
  reset: () => set({ sceneId: null, answers: {}, stepIndex: 0, generated: null, selectedTemplate: null }),
}));
