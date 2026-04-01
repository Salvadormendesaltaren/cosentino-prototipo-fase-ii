import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-[200px] bg-black aspect-[1440/400] md:aspect-[1440/400] relative">
      <div className="absolute bottom-[32px] left-[24px]">
        <Image
          src="/logos.svg"
          alt="Cosentino × Modulor Studios"
          width={400}
          height={30}
          className="h-auto w-auto"
        />
      </div>
    </footer>
  );
}
