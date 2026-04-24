import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Page(){

  
  return(
    <div className=" bg-[#050607] w-screen">
      <nav className="flex h-20 w-full items-center px-32 justify-between">
        <div className="flex items-center">
          <Image src="/Cube.png" alt="NextCube-Logo" height={36} width={36}/>
          <label htmlFor="NextCube-Name" className="text-white text-lg font-black tracking-[0.16em] ml-6">NEXTCUBE</label>
        </div>
        <div className="flex items-center text-white">
          <div className="flex gap-9 mr-16">
            <a href="">Sobre</a>
            <a href="">Produtos</a>
            <a href="">Cases</a>
            <a href="">Contato</a>
          </div>
          {/* button */}
          <a href="#contato" className="group hidden items-center gap-3 rounded-xl border border-red-500/60 px-5 py-2 text-sm font-bold text-white transition hover:border-red-400 hover:bg-red-500/10 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)] md:flex">
            Fale Conosco
            <ArrowRight/>
          </a>
        </div>
        
      </nav>
      <div className="px-32 w-full">
        <div>
          <div className="flex border border-white rounded-full gap-2 text-white p-2">
            <div className="bg-blue-600 rounded-full h-2 w-2"/>
            <label htmlFor="">Software House</label>
            <div className="bg-yellow-600 rounded-full"/>
            <label htmlFor="">Produtos Digitais</label>
            <div className="bg-red-600 rounded-full"/>
            <label htmlFor="">Infraestrutura</label>




          </div>
        </div>
        {/* <div></div> */}
      </div>

    </div>
  )
}
