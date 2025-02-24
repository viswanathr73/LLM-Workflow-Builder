import { LuFileInput } from "react-icons/lu";
import { CiMicrochip } from "react-icons/ci";
import { LuFileOutput } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx"; // Importing the icon

export default function Sidebar() {
  const components = [
    { id: "input", name: "Input", Icon: LuFileInput },
    { id: "llm", name: "LLM Engine", Icon: CiMicrochip },
    { id: "output", name: "Output", Icon: LuFileOutput },
  ];

  // Function to handle drag start
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-[251px] h-[792px] ">
      <div className="p-4">
        <h2 className="mb-2 px-2 text-lg font-semibold h-[21.15px] w-[117.05px]">
          Components
        </h2>
        <hr className="my-4 border-gray-300" />

        <p className="px-2 text-sm text-gray-500 mb-4">Drag and Drop</p>
        <div className="space-y-2 w-[205.89px] h-[35px]">
          {components.map(({ id, name, Icon }) => (
            <div
              key={id}
              className="flex items-center justify-between rounded-md border p-2 cursor-move hover:bg-gray-50"
              draggable
              onDragStart={(event) => handleDragStart(event, id)} // Attach drag event
            >
              <div className="flex items-center gap-2">
                <Icon className="text-gray-950" />
                <span className="text-sm">{name}</span>
              </div>
              <RxHamburgerMenu className="text-gray-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
