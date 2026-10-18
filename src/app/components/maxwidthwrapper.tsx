'use client'
import {ReactNode} from "react"
import {cn} from 'cn'

const MaxWidthWrapper = ({
    className,
    children
}:{
    className? : string
    children : ReactNode
}) => { 
    return(
        <div className={cn('w-full h-100% my-15', 
        className)}>
            {children}
        </div>
    )
} 

export default MaxWidthWrapper