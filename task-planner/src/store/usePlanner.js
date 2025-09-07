import { create } from "zustand"
import { persist } from "zustand/middleware"

export const usePlanner = create(persist(
    (set)=> ({
        tasks: [],
        addTask: (payload)=>set((state)=> ({
            tasks: [...state.tasks, payload]
        }))
    }),
    {name: "planner"}
))