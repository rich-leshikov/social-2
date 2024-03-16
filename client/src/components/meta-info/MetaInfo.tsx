import type { IconType } from "react-icons"
import type { FC } from "react"

type MetaInfoProps = {
  count: number
  Icon: IconType
}

export const MetaInfo: FC<MetaInfoProps> = ({ count, Icon }) => {
  return (
    <div className={"flex items-center gap-2 cursor-pointer"}>
      {count > 0 && (
        <p className="font-semibold text-default-400 text-l">{count}</p>
      )}
      <p className="text-default-400 text-xl hover:text-2xl ease-in duration-100">
        <Icon />
      </p>
    </div>
  )
}
