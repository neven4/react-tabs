import React, {
  createContext,
  useState,
  useContext,
  isValidElement,
  cloneElement,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from 'react'

type ITabsState = [number, Dispatch<SetStateAction<number>>]

interface PanelProps {
  children: React.ReactNode
  active?: boolean
}

interface TabProps {
  children: React.ReactNode
}

const TabsState = createContext<ITabsState | []>([])
const Elements = createContext({
  tabs: 0,
  panels: 0,
})

interface TabProps {
  state?: [number, () => void]
}

const elements = {
  tabs: 0,
  panels: 0,
}

const Tabs: React.FC<TabProps> = ({ state, children }) => {
  const innerState = useState(0)
  const contextState = state || innerState

  return (
    <Elements.Provider value={elements}>
      <TabsState.Provider value={contextState}>{children}</TabsState.Provider>
    </Elements.Provider>
  )
}

const useTabState = (): {isActive: boolean, onClick: () => void} => {
  const [activeIndex, setActive] = useContext(TabsState)
  const [isActive, setIsActive] = useState(false)
  const elements = useContext(Elements)
  const tabIndexRef = React.useRef<number>()

  useEffect(() => {
    const currentIndex = elements.tabs
    elements.tabs += 1
    tabIndexRef.current = currentIndex
    setIsActive(activeIndex === tabIndexRef.current)
  }, [])

  useEffect(() => {
    setIsActive(activeIndex === tabIndexRef.current)
  }, [activeIndex])

  const onClick = useCallback(() => {
    setActive &&
      tabIndexRef.current !== undefined &&
      setActive(tabIndexRef.current)
  }, [setActive])

  return {
    isActive,
    onClick,
  }
}

const usePanelState = (): boolean => {
  const [activeIndex] = useContext(TabsState)
  const elements = useContext(Elements)
  const [isActive, setIsActive] = useState(false)

  const panelIndexRef = React.useRef<number>()

  useEffect(() => {
    const currentIndex = elements.panels
    elements.panels += 1
    panelIndexRef.current = currentIndex
    setIsActive(activeIndex === panelIndexRef.current)
  }, [])

  useEffect(() => {
    setIsActive(activeIndex === panelIndexRef.current)
  }, [activeIndex])

  return isActive
}

const Tab = ({ children }: TabProps) => {
  const state = useTabState()

  if (typeof children === 'function') {
    return children(state)
  }

  return isValidElement(children) ? cloneElement(children, state) : children
}



const Panel = ({ active, children }: PanelProps) => {
  const isActive = usePanelState()
  return isActive || active ? children : null
}

export { Panel, Tab, Tabs, usePanelState, useTabState }

