import React from "react";

const CertificatePage = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-10 text-center text-blue-700">
        Generate Blue Carbon Credit Certificate
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-blue-600">Project Information</h2>
            <div className="space-y-4 text-sm">
              {[
                { label: "Project Name", value: "Mangrove Restoration Project - Sundarbans" },
                { label: "Project ID", value: "BCR-2023-0078" },
                { label: "Area Certified", value: "150 Hectares" },
                { label: "Credits Issued", value: "2,500 tCO2e" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="font-medium text-gray-600">{item.label}:</span>
                  <span className="text-gray-900 font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Certificate Actions</h2>
            <div className="flex flex-col space-y-4">
              <button className="px-4 py-2 text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition duration-200">Preview Certificate</button>
              <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition duration-200">Generate Certificate (PDF)</button>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Certificate Preview</h2>
          <div className="relative flex-grow bg-gray-100 rounded-lg overflow-hidden flex flex-col items-center justify-center border border-dashed border-gray-300">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/certificate_placeholder.png')" }}></div>
            <div className="relative z-10 p-6 bg-white bg-opacity-90 rounded-lg shadow-lg text-center">
              <p className="text-lg font-medium text-gray-700">Certificate Preview Placeholder</p>
              <p className="text-sm text-gray-500 mt-2">(Image will load here)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;