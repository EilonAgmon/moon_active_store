import {useState, useEffect, useRef, useCallback} from 'react';

function MyButton(props) {
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)
  
    // set isMounted to false when we unmount the component
    useEffect(() => {
      return () => {
        isMounted.current = false
      }
    }, [])
  
    const sendRequest = useCallback(async (props) => {
      // don't send again while we are sending
      if (isSending) return
      // update state
      setIsSending(true)
      // send the actual request
      //await API.sendRequest()
      //props.onClick();
      alert("fdfd");
      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)
    }, [isSending]) // update the callback if the state changes
  
    return (
      <input type="button" text="ggfgd" disabled={isSending} onClick={sendRequest} />
    )
  }
  export default MyButton;