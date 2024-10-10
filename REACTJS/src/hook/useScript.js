import {useEffect} from 'react'

const useScript=(src,integrity,crossOrigin = "anonymous" )=>{
    useEffect(() => {
        const script = document.createElement("script")
    
        script.src =
          "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
    
        script.integrity =
          "sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
    
        script.crossOrigin = "anonymous"
    
        document.body.appendChild(script)
    
        return () => {
          // clean up the script when the component in unmounted
          document.body.removeChild(script)
        }
      }, [src,integrity,crossOrigin])
      useEffect(() => {
        const script = document.createElement("script")
    
        script.src =
          "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
    
        script.integrity =
          "sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
    
        script.crossOrigin = "anonymous"
    
        document.body.appendChild(script)
    
        return () => {
          // clean up the script when the component in unmounted
          document.body.removeChild(script)
        }
      }, [src,integrity,crossOrigin])
      
      

}
export default useScript