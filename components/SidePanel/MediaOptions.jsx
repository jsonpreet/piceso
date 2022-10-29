import { Switch, Listbox, Transition } from "@headlessui/react";
import { useDesoStore } from "../../store/deso";

export default function MediaOptions() {
  const { setIsMetricsVisible, isMetricsVisible, isMediaVisible, setIsMediaVisible } = useDesoStore((state) => state);

  return (
    <div className="grid grid-cols-2 divide-x divide-[#061830] ">
      <div className="py-3 px-4">
        <Switch.Group>
          <div className="flex items-center justify-between">
            <Switch.Label className="mr-4 text-white font-semibold text-sm">
              Show Media
            </Switch.Label>
            <Switch
              checked={isMediaVisible}
              onChange={(val) => setIsMediaVisible(() => val)}
              className={`${
                isMediaVisible ? "bg-gradient-to-br from-[#ffcf26] to-[#cca20b]" : "bg-[#fff2c5]"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  isMediaVisible ? "translate-x-6 bg-white" : "translate-x-1 bg-[#a78200]"
                } inline-block h-4 w-4 transform rounded-full transition-transform`}
              />
            </Switch>
          </div>
        </Switch.Group>
      </div>
      <div className="py-3 px-4 flex items-center">
        <Switch.Group>
          <div className="flex items-center justify-between">
            <Switch.Label className="mr-4 text-white font-semibold text-sm">
              Show Metrics
            </Switch.Label>
            <Switch
              checked={isMetricsVisible}
              onChange={(val) => setIsMetricsVisible(() => val)}
              className={`${
                isMetricsVisible ? "bg-gradient-to-br from-[#ffcf26] to-[#cca20b]" : "bg-[#fff2c5]"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  isMetricsVisible ? "translate-x-6 bg-white" : "translate-x-1 bg-[#a78200]"
                } inline-block h-4 w-4 transform rounded-full transition-transform`}
              />
            </Switch>
          </div>
        </Switch.Group>
      </div>
    </div>
  );
}
