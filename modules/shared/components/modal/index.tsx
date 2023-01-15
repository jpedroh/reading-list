import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

type Props = {
    isOpen: boolean;
    close: () => void;
    title: ReactNode
    children: ReactNode
}

export function Modal({ isOpen, close, title, children }: Props) {
    return <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-zinc-800 bg-opacity-70" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all flex flex-col gap-4">
                            <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-zinc-300 border-b pb-3 border-zinc-700">
                                {title}
                            </Dialog.Title>
                            {children}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
}