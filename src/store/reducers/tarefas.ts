import {createSlice, PayloadAction} from '@reduxjs/toolkit'
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
    }
  }
})

export const {remover} = tarefasSlice.actions

export default tarefasSlice.reducer