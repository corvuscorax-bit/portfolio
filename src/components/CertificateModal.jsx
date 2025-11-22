export default function CertificateModal({ file, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-[90%] h-[90%] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={file}
          title="PDF Viewer"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
