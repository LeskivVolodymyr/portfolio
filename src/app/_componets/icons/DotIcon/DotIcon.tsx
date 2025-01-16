import {IIconProps} from "@/app/_componets/icons/icon-props";

interface IDotIconProps extends IIconProps {}

export default function DotIcon({ color = '#000' }: IDotIconProps) {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="5" r="5" fill={color}/>
        </svg>
    );
}
