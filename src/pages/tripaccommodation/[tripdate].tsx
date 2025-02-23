import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TripAccommodationLayout from "@/layout/tripaccommodation/layout";
import HeaderTripSelect from "@/components/header/HeaderTripSelect";
import TripAccommodationsMap from "@/components/tripaccommodation/TripAccommodationsMap";
import TripRegionDaysEdit from "@/components/common/TripRegionDaysEdit";
import SelectDateInfo from "@/components/common/SelectDateInfo";
import DefaultImage from "@/components/common/DefaultImage";
import SelectItem from "@/components/common/SelectItem";
import LocalAccommodationItem from "@/components/tripaccommodation/LocalAccommodationItem";
import ButtonLarge from "@/components/common/ButtonLarge";
import { DatesStore } from "@/store/DatesStore";
import {
  LocationAccommodationsStore,
  SelectAccommodationsStore,
} from "@/store/AccommodationsStore";

function TripAccommodationPage() {
  const params = useParams();
  const { tripDates } = DatesStore();
  const { locationAccommodations } = LocationAccommodationsStore();
  const { selectedAccommodations, setTripAccommodationsRange } =
    SelectAccommodationsStore();

  const date = Number(params?.tripdate);
  const dateIndex = date - 1;

  const [isSelected, SetIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (selectedAccommodations && selectedAccommodations[dateIndex]) {
      const length = selectedAccommodations[dateIndex].length;
      SetIsSelected(Boolean(length));
    }
  }, [selectedAccommodations]);

  return (
    <TripAccommodationLayout>
      <HeaderTripSelect isPadding inCloseButton />
      <TripAccommodationsMap />
      <TripRegionDaysEdit />
      <section className="flex flex-col gap-5 w-full p-5">
        <div className="flex justify-between">
          <SelectDateInfo tripDate={date} />
          <button
            type="button"
            onClick={() => setTripAccommodationsRange(tripDates!.length)}
            className="w-20 h-7 rounded-md border border-contentMuted  text-sm text-contentMuted hover:bg-secondary hover:border-black hover:text-black hover:font-semibold"
          >
            초기화
          </button>
        </div>
        <ul
          className={`grid grid-cols-1 lg:grid-cols-2 gap-3 w-full pr-3 py-3 rounded-xl ${isSelected ? "bg-button" : "bg-[#E9F0F0]"}`}
        >
          {isSelected ? (
            selectedAccommodations![dateIndex].map((accommodation, index) => (
              <SelectItem
                key={accommodation.contentid}
                index={index + 1}
                title={accommodation.title}
                addr={`${accommodation.addr2 ? accommodation.addr1 + " " + accommodation.addr2 : accommodation.addr1}`}
                imgSrc={accommodation.firstimage || accommodation.firstimage2}
              />
            ))
          ) : (
            <li className="flex gap-5 pl-5 items-center justify-start w-full">
              <span className="w-5 h-5 rounded-full bg-[#D0CFD7] text-center text-[#F3F5F5] leading-5">
                1
              </span>
              <div className="flex gap-3 items-center w-full p-3 rounded-xl bg-white">
                <DefaultImage />
                <p className="text-sm text-contentMuted">
                  추가된 장소가 없습니다.
                </p>
              </div>
            </li>
          )}
        </ul>
        <div
          className={`pt-5 border-t-4 ${isSelected ? "border-primary" : "border-[#D0CFD7]"}`}
        >
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full p-3 rounded-xl bg-[#E9F0F0]">
            {locationAccommodations &&
              locationAccommodations.map((location, index) => (
                <LocalAccommodationItem
                  key={index}
                  id={location.contentid}
                  index={dateIndex}
                  title={location.title}
                  addr={`${location.addr2 ? location.addr1 + " " + location.addr2 : location.addr1}`}
                  imgSrc={location.firstimage || location.firstimage2}
                />
              ))}
          </ul>
        </div>
      </section>
      <ButtonLarge href="/tripeidt" />
    </TripAccommodationLayout>
  );
}

export default TripAccommodationPage;
