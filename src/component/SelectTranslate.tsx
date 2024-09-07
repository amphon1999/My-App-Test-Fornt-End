import { useEffect, useState } from "react";
import Englis from "../assets/icon/unitedstates.png";
import thai from "../assets/icon/thai.png";
import { useTranslation } from "react-i18next";
import "../i18n/i18n"
import ArrowDropdown from "../assets/icon/arrowButton.svg"

const options = [
  {
    id: 1,
    name: "English",
    nameth: "อังกฤษ",
    imgSrc: Englis,
    lang: "en",
  },
  {
    id: 2,
    name: "Thailand",
    nameth: "ไทย",
    imgSrc: thai,
    lang: "th",
  },
];
export const SelectTranslate = () => {
  const { i18n } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const langOption = options.find((option) => option.lang === i18n.language);
    if (langOption) {
      setSelectedOption(langOption);
    }
  }, [i18n.language]);

  const handleOptionClick = (option: (typeof options)[0]) => {
    setSelectedOption(option);
    i18n.changeLanguage(option.lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="pl-4 w-36 h-12 bg-white rounded-lg border-slate-700"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="listbox-label"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <img
            src={selectedOption.imgSrc}
            alt=""
            className="h-5 w-5 flex-shrink-0 rounded-full"
          />
          <span className="ml-3 block truncate">
            {i18n.language === "en"
              ? selectedOption.name
              : selectedOption.nameth}
          </span>
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
         <img src={ArrowDropdown} alt="" />
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute z-50 mt-1 w-full overflow-auto bg-white rounded-lg"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {options.map((option) => (
            <li
              key={option.id}
              className="text-[#000] relative cursor-pointer select-none py-2 pl-3 pr-9 mb-1"
              id={`listbox-option-${option.id}`}
              role="option"
              onClick={() => handleOptionClick(option)}
            >
              <div className="flex items-center">
                <img
                  src={option.imgSrc}
                  alt=""
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                />
                <span className="font-normal ml-3 block truncate">
                  {i18n.language === "en" ? option.name : option.nameth}
                </span>
              </div>
              {selectedOption.id === option.id && (
                <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
