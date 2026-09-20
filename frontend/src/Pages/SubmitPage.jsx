import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import useUserStore from "../stores/useUserStore";

function LocationPicker({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
}

function RecenterMap({ lat, lng }) {
  const map = useMapEvents({});
  useEffect(() => {
    map.flyTo([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
}

const SubmitPage = () => {
  const { createProject, isSubmitting } = useUserStore();
  const [formData, setFormData] = useState({
    projectName: "",
    implementingOrganization: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    locUrl: "",
    state: "",
    city: "",
    area: "",
    expectedCarbon: "",
    EIA_Report_Final: "",
    Community_Agreement: "",
    Feasibility_Study: "",
    Site_Before_Mangrove: "",
    Site_After_Mangrove: "",
    Planting_Day_Volunteer: "",
  });

  const [currentLocation, setCurrentLocation] = useState([20.5937, 78.9629]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [files, setFiles] = useState([
    { name: "EIA_Report_Final.pdf", status: "Pending" },
    { name: "Community_Agreement.pdf", status: "Pending" },
    { name: "Feasibility_Study.pdf", status: "Pending" },
  ]);
  const [assessmentsPdf, setAssessmentsPdf] = useState({
    "EIA_Report_Final.pdf": "",
    "Community_Agreement.pdf": "",
    "Feasibility_Study.pdf": "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [visualFiles, setVisualFiles] = useState([
    { name: "Site_Before_Mangrove", file: null, status: "Pending" },
    { name: "Planting_Day_Volunteer", file: null, status: "Pending" },
    { name: "Site_After_Mangrove", file: null, status: "Pending" },
  ]);
  const [selectedVisualFile, setSelectedVisualFile] = useState(null);
  const pdfRef = useRef(null);
  const imageRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = [position.coords.latitude, position.coords.longitude];
        setCurrentLocation(location);
        setSelectedLocation({ lat: location[0], lng: location[1] });
      },
      (error) => console.error("Error getting location:", error)
    );
  };

  const handleLocationSelect = (latlng) => {
    setSelectedLocation(latlng);
    setCurrentLocation([latlng.lat, latlng.lng]);
    setFormData((prev) => ({
      ...prev,
      locUrl: "https://www.google.com/maps?q=" + latlng.lat + "," + latlng.lng,
    }));
  };

  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || selectedFile === null) return;
    const reader = new FileReader();
    reader.onload = () => {
      const fileUrl = reader.result;
      setFiles((prev) =>
        prev.map((item, idx) =>
          idx === selectedFile ? { ...item, status: "Uploaded" } : item
        )
      );
      setAssessmentsPdf((prev) => ({
        ...prev,
        [files[selectedFile].name]: fileUrl,
      }));
      setSelectedFile(null);
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handlePreview = (data) => {
    const blob = new Blob(
      [Uint8Array.from(atob(data.split(",")[1]), (c) => c.charCodeAt(0))],
      { type: "application/pdf" }
    );
    window.open(URL.createObjectURL(blob), "_blank");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || selectedVisualFile === null) return;
    const reader = new FileReader();
    reader.onload = () => {
      setVisualFiles((prev) =>
        prev.map((item, idx) =>
          idx === selectedVisualFile
            ? { ...item, file: reader.result, status: "Uploaded" }
            : item
        )
      );
      setSelectedVisualFile(null);
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const removeVisualFile = (idx) => {
    setVisualFiles((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, file: null, status: "Pending" } : item
      )
    );
  };

  const handleSubmit = async () => {
    const submissionData = {
      ...formData,
      EIA_Report_Final: assessmentsPdf["EIA_Report_Final.pdf"] || "",
      Community_Agreement: assessmentsPdf["Community_Agreement.pdf"] || "",
      Feasibility_Study: assessmentsPdf["Feasibility_Study.pdf"] || "",
      Site_Before_Mangrove:
        visualFiles.find((f) => f.name === "Site_Before_Mangrove")?.file || "",
      Planting_Day_Volunteer:
        visualFiles.find((f) => f.name === "Planting_Day_Volunteer")?.file || "",
      Site_After_Mangrove:
        visualFiles.find((f) => f.name === "Site_After_Mangrove")?.file || "",
    };

    await createProject(submissionData);

    setFormData({
      projectName: "",
      implementingOrganization: "",
      projectDescription: "",
      startDate: "",
      endDate: "",
      locUrl: "",
      state: "",
      city: "",
      area: "",
      expectedCarbon: "",
      EIA_Report_Final: "",
      Community_Agreement: "",
      Feasibility_Study: "",
      Site_Before_Mangrove: "",
      Site_After_Mangrove: "",
      Planting_Day_Volunteer: "",
    });
    setAssessmentsPdf({
      "EIA_Report_Final.pdf": "",
      "Community_Agreement.pdf": "",
      "Feasibility_Study.pdf": "",
    });
    setFiles([
      { name: "EIA_Report_Final.pdf", status: "Pending" },
      { name: "Community_Agreement.pdf", status: "Pending" },
      { name: "Feasibility_Study.pdf", status: "Pending" },
    ]);
    setVisualFiles([
      { name: "Site_Before_Mangrove", file: null, status: "Pending" },
      { name: "Planting_Day_Volunteer", file: null, status: "Pending" },
      { name: "Site_After_Mangrove", file: null, status: "Pending" },
    ]);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-8">New Project Submission</h1>

      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <div className="border-b pb-4 mb-6 border-gray-200">
          <h2 className="text-xl font-semibold">Project Details</h2>
          <p className="text-sm text-gray-500 mt-1">
            Provide general information about your blue carbon project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["projectName", "Project Name", "Sundarbans Mangrove Restoration Phase II"],
            ["implementingOrganization", "Implementing Organization", "Coastal Ecosystems NGO"],
            ["state", "State", "Maharashtra"],
            ["city", "City", "Mumbai"],
            ["area", "Area Cover", "150 Hectares"],
            ["expectedCarbon", "Expected Carbon Sequestration (tonnes CO2e)", "15000"],
          ].map(([name, label, placeholder]) => (
            <div className="flex flex-col" key={name}>
              <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={name === "expectedCarbon" ? "number" : "text"}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700 mb-1">Project Description</label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            rows="4"
            className="px-4 py-2 w-full border border-gray-300 rounded-md"
            placeholder="Describe the blue carbon project, restoration work, biodiversity benefits, and carbon goals."
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="px-4 py-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="px-4 py-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-gray-700">Project Location</label>
            <button
              type="button"
              onClick={getMyLocation}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Use My Location
            </button>
          </div>
          <div className="h-80 rounded-lg overflow-hidden border">
            <MapContainer center={currentLocation} zoom={5} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationPicker onLocationSelect={handleLocationSelect} />
              <RecenterMap lat={currentLocation[0]} lng={currentLocation[1]} />
              {selectedLocation && (
                <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
                  <Popup>Selected project location</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
          <input
            type="text"
            name="locUrl"
            value={formData.locUrl}
            onChange={handleChange}
            placeholder="Location URL"
            className="mt-3 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <div className="border-b pb-4 mb-6 border-gray-200">
          <h2 className="text-xl font-semibold">Supporting Documents</h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload environmental assessments, agreements, and other relevant documents.
          </p>
        </div>
        <div className="border-2 border-dashed border-gray-300 p-12 rounded-lg text-center text-gray-500">
          <p className="mb-3">
            {selectedFile === null
              ? "Select a document from the list below to upload"
              : "Upload a new file for the selected document"}
          </p>
          <input type="file" accept=".pdf,.docx,.xlsx" ref={pdfRef} onChange={handlePdfChange} hidden />
          <button
            type="button"
            disabled={selectedFile === null}
            onClick={() => pdfRef.current?.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-200 disabled:text-gray-500"
          >
            {selectedFile === null ? "Select a Document First" : "Upload File"}
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {files.map((file, idx) => (
            <div
              key={file.name}
              onClick={() => setSelectedFile(idx)}
              className={`flex justify-between items-center p-4 rounded-md cursor-pointer border ${selectedFile === idx ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
            >
              <span className="text-sm font-medium">{file.name}</span>
              <div className="flex items-center gap-2">
                {file.status === "Uploaded" && assessmentsPdf[file.name] && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreview(assessmentsPdf[file.name]);
                    }}
                    className="text-xs px-2 py-1 rounded bg-green-100 text-green-800"
                  >
                    Preview
                  </button>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500">
                  {file.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <div className="border-b pb-4 mb-6 border-gray-200">
          <h2 className="text-xl font-semibold">Visual Evidence</h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload photos of the project site, including before, during, and after restoration efforts.
          </p>
        </div>
        <div className="border-2 border-dashed border-gray-300 p-12 rounded-lg text-center text-gray-500">
          <p className="mb-3">
            {selectedVisualFile === null
              ? "Select a photo from below to upload"
              : "Upload a new photo for the selected entry"}
          </p>
          <input type="file" accept="image/*" ref={imageRef} onChange={handleImageChange} hidden />
          <button
            type="button"
            disabled={selectedVisualFile === null}
            onClick={() => imageRef.current?.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-200 disabled:text-gray-500"
          >
            {selectedVisualFile === null ? "Select a Photo First" : "Upload Photo"}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visualFiles.map((file, idx) => (
            <div
              key={file.name}
              onClick={() => setSelectedVisualFile(idx)}
              className={`relative bg-gray-50 rounded-lg overflow-hidden shadow cursor-pointer border ${selectedVisualFile === idx ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
            >
              {file.file ? (
                <div className="relative">
                  <img src={file.file} alt={file.name} className="w-full h-40 object-cover" />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeVisualFile(idx);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                  {file.name}
                </div>
              )}
              <div className="p-4">
                <span className="block text-sm font-medium truncate mb-2">{file.name}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500">
                  {file.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button type="button" className="px-6 py-2 border border-gray-300 rounded-md">Cancel</button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {isSubmitting ? "Submitting...." : "Submit Project"}
        </button>
      </div>
    </div>
  );
};

export default SubmitPage;
