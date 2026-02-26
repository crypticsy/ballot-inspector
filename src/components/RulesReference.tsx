import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { VALID_RULES, INVALID_RULES } from "../data/rules";

export default function RulesReference() {
  return (
    <div
      className="rounded flex-1 min-h-0 flex flex-col overflow-hidden rules-scrol bg-desk/[0.92] border border-[rgba(180,150,100,0.22)]"
    >
      {/* Header — always visible */}
      <div
        className="px-3 py-2 shrink-0 border-b border-[rgba(180,150,100,0.18)]"
      >
        <p
          className="font-typewriter tracking-widest uppercase text-gold text-[0.72rem]"
        >
          ELECTION RULES
        </p>
      </div>

      <div className="px-3 py-2 flex-1 flex flex-col justify-between">
        {/* Valid section */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5 text-[#2a9a2a]">
            <FiCheckCircle size={13} />
            <span
              className="font-typewriter tracking-wider uppercase text-[0.7rem]"
            >
              Valid Ballot
            </span>
          </div>
          <ul className="space-y-2">
            {VALID_RULES.map((r, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[#8ab88a] text-[0.66rem] leading-[1.35]">
                <span className="text-[#2a9a2a] mt-[2px] shrink-0">·</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Invalid section */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5 text-stamp-red-light">
            <FiXCircle size={13} />
            <span
              className="font-typewriter tracking-wider uppercase text-[0.7rem]"
            >
              Invalid Ballot
            </span>
          </div>
          <ul className="space-y-2">
            {INVALID_RULES.map((r, i) => (
              <li key={i} className="text-[0.66rem] leading-[1.35]">
                <span className="font-bold capitalize text-[#ee4444]">{r.label}</span>
                {' — '}
                <span className="text-[#8a6868] text-[0.62rem]">{r.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="pt-2 border-t border-[rgba(180,150,100,0.12)] text-[#4a3a2a] text-[0.58rem] leading-[1.4]"
        >
          Election Commission, Nepal
          <br />
          Representation of the People Act, 2074 BS
        </div>
      </div>
    </div>
  );
}
