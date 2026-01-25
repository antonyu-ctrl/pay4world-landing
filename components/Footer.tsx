import Image from "next/image";
import { ASSETS, NAV } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Image src={ASSETS.logo} alt="Pay4World 로고" width={180} height={48} />
            <p className="mt-3 text-sm leading-6 text-brand-slate">
              위치기반 소셜 네트워크와 게임이 결합된, 지속가능한 기부 플랫폼.
            </p>
            <p className="mt-3 text-xs text-brand-slate">
              로고:{" "}
              <a className="underline" href={ASSETS.logo} target="_blank">
                https://www.genspark.ai/api/files/s/EfStRggv
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm font-bold">메뉴</p>
              <ul className="mt-3 space-y-2 text-sm text-brand-slate">
                {NAV.map((n) => (
                  <li key={n.id}>
                    <a className="hover:text-brand-ink" href={`#${n.id}`}>
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold">연락</p>
              <ul className="mt-3 space-y-2 text-sm text-brand-slate">
                <li>
                  <a className="hover:text-brand-ink" href="mailto:hello@pay4world.example">
                    hello@pay4world.example
                  </a>
                </li>
                <li className="text-xs">
                  (위 메일은 예시입니다. 실제 메일/주소로 바꿔드릴게요.)
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold">자료</p>
              <ul className="mt-3 space-y-2 text-sm text-brand-slate">
                <li>
                  <a
                    className="hover:text-brand-ink underline"
                    href="https://www.genspark.ai/api/files/s/Hbg80pt7"
                    target="_blank"
                  >
                    사업자료(PDF) Source
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-ink underline" href={ASSETS.heroBg} target="_blank">
                    히어로 배경
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-ink underline" href={ASSETS.colorRef} target="_blank">
                    컬러 참조
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-brand-slate sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pay4World. All rights reserved.</p>
          <p className="opacity-80">
            “Pay it forward” 정신을 바탕으로 선행의 연쇄를 확산합니다. [Source](https://www.genspark.ai/api/files/s/Hbg80pt7)
          </p>
        </div>
      </div>
    </footer>
  );
}