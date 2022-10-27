import { ipcRenderer } from 'electron'
import { DMQueueElement, InstallParams } from './../../common/types'

export const install = async (args: InstallParams) => {
  const dmQueueElement: DMQueueElement = {
    params: args
  }
  ipcRenderer.send('addToDMQueue', dmQueueElement)
}

export const getDMQueueInformation = async () => {
  return ipcRenderer.invoke('getDMQueueInformation')
}

export const removeFromDMQueue = (appName: string) => {
  return ipcRenderer.send('removeFromDMQueue', appName)
}

export const clearDMFinished = () => {
  return ipcRenderer.send('clearDMFinished')
}

export const handleDMQueueInformation = (
  onChange: (e: Electron.IpcRendererEvent, elements: DMQueueElement[]) => void
) => {
  ipcRenderer.on('changedDMQueueInformation', onChange)
  return () => {
    ipcRenderer.removeListener('changedDMQueueInformation', onChange)
  }
}