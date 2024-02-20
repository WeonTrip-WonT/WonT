import Image from "next/image";
import { RegionStore } from "@/store/RegionStore";
import { useState } from "react";

const RegionItem = ({ regionName = "지역이름" }) => {
  const { selectedRegionName, setRegionName, resetRegionName } = RegionStore();
  const [toggle, setToggle] = useState(false);

  const selectRegion = () => {
    setToggle(() => !toggle);
    if (!selectedRegionName) setRegionName(regionName);
    else resetRegionName();
  };

  return (
    <>
      <button
        type="button"
        onClick={selectRegion}
        className="flex flex-col items-center gap-[0.625rem] p-[0.625rem]"
      >
        <div className="relative w-[8.4375rem] h-[8.4375rem] rounded-[0.625rem] overflow-hidden bg-[#D0CFD7] object-cover">
          <Image
            src="/svg/regionIcon-selected.svg"
            width={20.5}
            height={20}
            alt="선택한 여행 지역"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <dl>
          <dt className="sr-only">지역이름</dt>
          <dd className="mx-[0.625rem] my-[0.125rem] text-lg text-contentSecondary font-medium">
            {regionName}
          </dd>
        </dl>
      </button>
      {toggle ? (
        <div className="flex flex-col gap-[0.625rem] mx-auto p-[0.625rem] rounded-[0.625rem] bg-button">
          <dl className="flex flex-col gap-[0.625rem] w-[18.75rem] px-[0.625rem] py-[0.9375rem] rounded-[0.625rem] bg-white text-contentMuted">
            <dt className="text-contentSecondary">지역정보</dt>
            <dd>지역 설명 텍스트입니다.</dd>
            {selectedRegionName}
          </dl>
          <dl className="flex flex-col gap-[0.625rem] w-[18.75rem] px-[0.625rem] py-[0.9375rem] rounded-[0.625rem] bg-white text-contentMuted">
            <dt className="text-contentSecondary">관광지도</dt>
            <dd>궁금한 주제를 선택해 보세요. (?)</dd>
          </dl>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default RegionItem;
