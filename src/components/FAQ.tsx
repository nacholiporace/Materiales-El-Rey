"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Truck,
  CreditCard,
  ShieldCheck,
  Calculator,
} from "lucide-react";
import { ElementType } from "react";

type AccordionItemType = {
  icon: ElementType;
  value: string;
  question: string;
  answer: string;
};

const accordionItems: AccordionItemType[] = [
  {
    icon: Truck,
    value: "ENVÍOS",
    question: "¿Tienen envío a domicilio y cobertura en mi zona?",
    answer:
      "Sí, realizamos entregas express en CABA y el Gran Buenos Aires. Contamos con grúas propias para descargar bolsones y palets directamente en tu obra con rapidez y cuidado.",
  },
  {
    icon: CreditCard,
    value: "PAGOS",
    question: "¿Cuáles son las formas de pago?",
    answer:
      "Aceptamos Efectivo, Transferencia Bancaria, y ofrecemos planes de financiación como Cuota Simple con tarjetas de crédito. Podés congelar precios abonando por adelantado.",
  },
  {
    icon: ShieldCheck,
    value: "ACOPIO",
    question: "¿Puedo comprar y acopiar mis materiales?",
    answer:
      "¡Por supuesto! Ofrecemos acopio sin cargo por hasta 6 meses. Así asegurás los precios de hoy y nosotros te vamos mandando los materiales a medida que tu obra los requiera.",
  },
  {
    icon: Calculator,
    value: "COTIZACIÓN",
    question: "¿Me hacen presupuesto a partir de un plano de obra?",
    answer:
      "Sí. Podés acercarte a nuestro local o mandarnos por WhatsApp el listado de materiales exacto o el cómputo del arquitecto y los vendedores te arman tu presupuesto el día de hoy.",
  },
];

export default function FAQ() {
  return (
    <section className="w-full bg-white py-24 border-t border-zinc-200">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-red-600 text-sm font-bold uppercase tracking-widest mb-2">Resolvé tus dudas</p>
          <h2 className="text-4xl font-bold text-zinc-900 tracking-tight">Preguntas Frecuentes</h2>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {accordionItems.map(({ icon: Icon, value, question, answer }) => (
            <AccordionItem
              key={value}
              value={value}
              className="group border border-zinc-200 bg-stone-50 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300"
            >
              <AccordionTrigger
                className="flex items-center justify-between w-full px-5 py-4 bg-transparent text-left group-data-[state=open]:bg-white transition-colors hover:no-underline"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center group-data-[state=open]:bg-red-100 group-data-[state=open]:text-red-600 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-zinc-500 group-data-[state=open]:text-red-600" />
                  </div>
                  <span className="text-lg font-bold text-zinc-800 group-data-[state=open]:text-zinc-900 pr-4 leading-tight">
                    {question}
                  </span>
                </div>
                {/* No chevron rotation */}
                <span className="text-xs font-bold text-zinc-400 group-data-[state=open]:text-red-500 transition-colors duration-300 tracking-widest uppercase hidden sm:block">
                {value.toUpperCase()}
              </span>
            </AccordionTrigger>

            <AccordionContent className="relative px-5 py-5 text-base text-zinc-600 bg-white border-t border-zinc-100 before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-red-500 before:opacity-0 group-data-[state=open]:before:opacity-100 transition-all duration-300 leading-relaxed">
              <div className="pl-14 pr-4">
                {answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </div>
    </section>
  );
}
