import { useFont } from "@/provider/FontProvider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FONTS } from "@/constants";

type Font =
  | "Inter"
  | "Montserrat"
  | "Roboto"
  | "Poppins"
  | "Lato"
  | "Open Sans"
  | "Noto Sans"
  | "Satoshi";

export function FontSelector() {
  const { font, setFont } = useFont();

  return (
    <Select onValueChange={(value) => setFont(value as Font)}>
      <SelectTrigger className="w-full sm:w-10/12">
        <SelectValue placeholder={font}>{font}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {FONTS.map(({ name, value }) => (
            <SelectItem key={value} value={value}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
