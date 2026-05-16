interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="relative bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-md mx-4 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-medium text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}