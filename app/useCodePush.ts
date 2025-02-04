import { useCallback, useEffect } from 'react'
import { useAppState } from '@react-native-community/hooks'
import CodePush from 'react-native-code-push'
import { useVisibleEffect } from 'hybrid-navigation'
import { Log } from './log'

export function useCodePush() {
  useVisibleEffect(
    useCallback(() => {
      CodePush.allowRestart()
      return () => {
        CodePush.disallowRestart()
      }
    }, []),
  )

  const appStatus = useAppState()

  useEffect(() => {
    if (appStatus !== 'active') {
      return
    }
    Log.i('[CodePush] App 由后台进入前台')

    sync()
  }, [appStatus])
}

function sync() {
  CodePush.sync({
    installMode: CodePush.InstallMode.IMMEDIATE,
  }).catch(e => Log.e(e))
}
