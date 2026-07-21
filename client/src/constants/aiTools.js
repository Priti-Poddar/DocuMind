import {
  Brain,
  BookOpen,
  CircleHelp,
  Layers3,
  GraduationCap,
  Lightbulb,
} from "lucide-react";

export const aiTools = [
  {
    title: "Summary",
    icon: Brain,
    prompt:
      "Summarize this document in simple language using headings and bullet points.",
  },
  {
    title: "Explain",
    icon: BookOpen,
    prompt:
      "Explain the difficult concepts from this document with simple examples.",
  },
  {
    title: "Quiz",
    icon: CircleHelp,
    prompt:
      "Generate 15 multiple-choice questions with answers from this document.",
  },
  {
    title: "Flashcards",
    icon: Layers3,
    prompt: "Create flashcards in Question → Answer format from this document.",
  },
  {
    title: "Viva",
    icon: GraduationCap,
    prompt:
      "Generate important viva questions with detailed answers from this document.",
  },
  {
    title: "Key Concepts",
    icon: Lightbulb,
    prompt:
      "List the important concepts from this document with a one-line explanation.",
  },
];
