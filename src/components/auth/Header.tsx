const Header = (props: {title: string, className?: string}) => {
  return (
    <div className={`${props.className} uppercase text-3xl text-primary font-bold`}>
        {props.title}
    </div>
  )
}

export default Header