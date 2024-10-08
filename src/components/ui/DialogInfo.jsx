import { Fragment } from 'react';
import { Dialog, Transition, DialogTitle, TransitionChild, DialogPanel } from '@headlessui/react';
import { RiInformationLine } from 'react-icons/ri';

const DialogInfo = ({
  isOpen,
  setIsOpen,
  title,
  description,
  cancelButtonText,
  onCancel,
  cancelButtonColor = 'border-foreground', // Color por defecto para el botón de cancelar
  icon = <RiInformationLine className="w-10 h-10 flex items-center justify-center rounded-full text-orange-500" />, // Ícono por defecto
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background/30 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-100 p-6 text-left align-middle shadow-xl transition-all">
                <div className="text-center flex justify-center mb-5">
                  {icon}
                </div>
                <DialogTitle as="h3" className="text-center text-lg font-medium leading-6">
                  {title}
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-center">
                    {description}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-x-2">
                  <button
                    type="button"
                    className={`p-2 rounded-xl bg-orange-300 text-gray-600 border border-dashed ${cancelButtonColor} w-full outline-none transform transition-all duration-300 hover:scale-105 `}
                    onClick={onCancel}
                  >
                    {cancelButtonText}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogInfo;