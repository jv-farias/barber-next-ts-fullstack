import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

const BookingItem = () => {
    return (
        <Card>
            <CardContent className="p-5 flex flex-row justify-between items-center py-0 " >
                <div className="flex flex-col gap-2 py-5 " >
                    <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit">Confirmado</Badge>
                    <h2 className="font-bold" >Corte de Cabelo</h2>
                    <div className="flex items-center gap-2" >
                        <Avatar className="h-6 w-6" >
                            <AvatarImage src="https://imguol.com/c/esporte/de/2023/12/30/cristiano-ronaldo-comemora-apos-vitoria-do-al-nassr-contra-o-al-taawoun-pelo-sauditao-1703981349096_v2_450x450.jpg" />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <h3 className="text-sm" >Vintage Barber</h3>
                    </div>
                </div>
                <div className="flex flex-col items-center border-l border-solid border-secondary px-3" >
                    <p className="text-sm" >Fevereiro</p>
                    <p className="text-2xl">06</p>
                    <p className="text-sm" >09:45</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default BookingItem