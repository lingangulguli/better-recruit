import { create } from 'zustand';
import type { SceneId, UserAnswers, GeneratedContent, Template } from '@recruit-poster/shared';

interface FlowState {
  sceneId: SceneId | null;
  answers: UserAnswers;
  stepIndex: number;
  generated: GeneratedContent | null;
  selectedTemplate: Template | null;
  isEditing: boolean;

  setScene: (s: SceneId) => void;
  setAnswer: (key: string, value: UserAnswers[string]) => void;
  setStep: (i: number) => void;
  setGenerated: (g: GeneratedContent | null) => void;
  setTemplate: (t: Template | null) => void;
  updateContent: (updates: Partial<GeneratedContent>) => void;
  setIsEditing: (editing: boolean) => void;
  reset: () => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  sceneId: null,
  answers: {},
  stepIndex: 0,
  generated: null,
  selectedTemplate: null,
  isEditing: false,

  setScene: (s) => set({ sceneId: s, answers: {}, stepIndex: 0, generated: null, selectedTemplate: null, isEditing: false }),
  setAnswer: (key, value) => set((state) => ({
    answers: { ...state.answers, [key]: value },
  })),
  setStep: (i) => set({ stepIndex: i }),
  setGenerated: (g) => set({ generated: g }),
  setTemplate: (t) => set({ selectedTemplate: t }),
  updateContent: (updates) => set((state) => ({
    generated: state.generated ? { ...state.generated, ...updates } : null,
  })),
  setIsEditing: (editing) => set({ isEditing: editing }),
  reset: () => set({ sceneId: null, answers: {}, stepIndex: 0, generated: null, selectedTemplate: null, isEditing: false }),
}));
