"use client"

import { subDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useOrderStore } from "./Earnings"


type Range = {
  name: string,
  value: number
}

const selectRanges: Range[] = [
  {
    "name": "Today",
    "value": 0,
  },
  {
    "name": "This Week",
    "value": 7,
  },
  {
    "name": "This Month",
    "value": 30,
  },
  {
    "name": "This Year",
    "value": 365,
  },
]


function DateFilter({data}: {data: Order[]}) {
  const [date, setDate] = useState<Date>()
  const { entities, setEntities } = useOrderStore();
  const [selected, setSelected] = useState<string | undefined>("This Month");


  useEffect(() => {
    if (!data.length || !date) return;

    setSelected(format(date, "PP"));
    setEntities(
      data.filter(order => {
        const orderDate = new Date(order.created_at);
        return format(orderDate, "PP") == format(date, "PP")
      })
    )
    
  }, [data, date])

  const onRangeSelect = (rangeMinDate: Date) => {
    setEntities(
      data.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate >= rangeMinDate
      })
    )
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal mb-5",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            <span>{selected}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
          <Select
            onValueChange={(value) => {
              const rangeMinDate = subDays(new Date(), parseInt(value));
              onRangeSelect(rangeMinDate);
              setSelected(selectRanges.find(range => range.value === parseInt(value))?.name)
            }
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="This Month" />
            </SelectTrigger>
            <SelectContent position="popper">
              {selectRanges.map(range => (
                <SelectItem 
                  key={range.name} 
                  value={range.value.toString()}
                >
                  {range.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </PopoverContent>
      </Popover>
        <div className="text-xs text-center pb-2 text-opacity">
          {!entities.length && "No"} Earnings for {selected}
        </div>
    </>
  )
}

export default DateFilter