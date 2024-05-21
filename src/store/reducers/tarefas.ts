import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tarefa from '../../models/Tarefas'
import * as enums from '../../utils/enums/Tarefa'

type TarefasState = {
  itens: Tarefa[]
}

const initialState: TarefasState = {
  itens: [
    {
      id: 1,
      titulo: 'Estudar Js',
      descricao: 'Estudar Js',
      prioridade: enums.Prioridade.NORMAL,
      status: enums.Status.CONCLUIDA,
    },
    {
      id: 2,
      titulo: 'Estudar Ts',
      descricao: 'Estudar Ts',
      prioridade: enums.Prioridade.IMPORTANTE,
      status: enums.Status.PENDENTE,
    },
    {
      id: 3,
      titulo: 'Estudar Csss',
      descricao: 'Estudar Css',
      prioridade: enums.Prioridade.NORMAL,
      status: enums.Status.PENDENTE,
    }
  ]
}

const tarefasSlice = createSlice({
  name: 'tarefas',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter(tarefa => tarefa.id !== action.payload)
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaJaExiste = state.itens.find(
        (tarefa) =>
          tarefa.titulo.toLocaleLowerCase() === action.payload.titulo.toLocaleLowerCase()
      )

      if (tarefaJaExiste) {
        alert("Já existe essa tarefa")
      } else {
        const ultimaTarefa = state.itens[state.itens.length -1]
        
        const tarefaNova = {
          ...action.payload,
          id: ultimaTarefa ? ultimaTarefa.id + 1 : 1
        }
        state.itens.push(tarefaNova)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa].status = action.payload.finalizado
        ? enums.Status.CONCLUIDA
        : enums.Status.PENDENTE
      }
    }
  }
})

export const { remover, editar, cadastrar, alteraStatus } = tarefasSlice.actions

export default tarefasSlice.reducer