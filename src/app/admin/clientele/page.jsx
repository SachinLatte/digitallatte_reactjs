"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaBuilding,
  FaPlus,
  FaEye,
  FaImage,
  FaShapes,
  FaStar,
  FaRegStar,
  FaGripVertical,
  FaArrowUp,
  FaArrowDown,
  FaTrashCan,
  FaPenToSquare,
  FaMagnifyingGlass,
  FaCircleNotch,
  FaXmark,
  FaCheck,
  FaLayerGroup,
  FaUpload,
  FaArrowRotateRight,
} from "react-icons/fa6";
import { getAssetPath } from "@/utils/assetPath";

export default function AdminClientelePage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [clients, setClients] = useState([]);
  const [stats, setStats] = useState({
    totalClients: 0,
    totalCategories: 0,
    homepageClientsCount: 0,
  });

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [onlyHomepage, setOnlyHomepage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Drag and Drop
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  // Modals
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showManageCategoriesModal, setShowManageCategoriesModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  // Form State - Add Category
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [isCategorySubmitting, setIsCategorySubmitting] = useState(false);

  // Form State - Add/Edit Client
  const [clientName, setClientName] = useState("");
  const [clientLogo, setClientLogo] = useState("");
  const [clientCategory, setClientCategory] = useState("top-brands");
  const [clientShowOnHome, setClientShowOnHome] = useState(false);
  const [isClientSubmitting, setIsClientSubmitting] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const fileInputRef = useRef(null);

  // Toast / Feedback
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3500);
  };

  // Fetch all clientele data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/clientele");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories || []);
        setClients(data.clients || []);
        setStats(
          data.stats || {
            totalClients: (data.clients || []).length,
            totalCategories: (data.categories || []).length,
            homepageClientsCount: (data.clients || []).filter((c) => c.showOnHome).length,
          }
        );
      } else {
        showToast(data.message || "Failed to load clientele data", "error");
      }
    } catch (err) {
      console.error("Error loading clientele data:", err);
      showToast("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Upload logo helper
  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size < 250 KB
    if (file.size > 250 * 1024) {
      alert(
        `⚠️ Logo file exceeds 250 KB (Current: ${Math.round(
          file.size / 1024
        )} KB). Please compress below 250 KB.`
      );
      return;
    }

    setIsUploadingLogo(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setClientLogo(data.url);
        showToast("Logo uploaded successfully", "success");
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      alert("Error uploading logo: " + err.message);
    } finally {
      setIsUploadingLogo(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // 1. ADD CATEGORY SUBMIT
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      alert("Please enter a category name");
      return;
    }

    setIsCategorySubmitting(true);
    try {
      const res = await fetch("/api/admin/clientele", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_category",
          name: newCategoryName.trim(),
          id: newCategoryId.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || "Category added successfully!");
        setShowAddCategoryModal(false);
        setNewCategoryName("");
        setNewCategoryId("");
        fetchData();
      } else {
        alert(data.message || "Failed to add category");
      }
    } catch (err) {
      alert("Error adding category: " + err.message);
    } finally {
      setIsCategorySubmitting(false);
    }
  };

  // 2. ADD / EDIT CLIENT SUBMIT
  const handleSaveClient = async (e) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert("Please enter a brand / client name");
      return;
    }
    if (!clientLogo.trim()) {
      alert("Please upload or provide a logo image");
      return;
    }

    setIsClientSubmitting(true);
    try {
      if (editingClient) {
        // Edit existing client
        const res = await fetch("/api/admin/clientele", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update_client",
            id: editingClient.id || editingClient._id,
            name: clientName.trim(),
            logo: clientLogo.trim(),
            category: clientCategory,
            showOnHome: clientShowOnHome,
          }),
        });
        const data = await res.json();
        if (data.success) {
          showToast("Client logo updated successfully!");
          setShowAddClientModal(false);
          setEditingClient(null);
          fetchData();
        } else {
          alert(data.message || "Update failed");
        }
      } else {
        // Add new client
        const res = await fetch("/api/admin/clientele", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "add_client",
            name: clientName.trim(),
            logo: clientLogo.trim(),
            category: clientCategory,
            showOnHome: clientShowOnHome,
          }),
        });
        const data = await res.json();
        if (data.success) {
          showToast("New client logo added successfully!");
          setShowAddClientModal(false);
          resetClientForm();
          fetchData();
        } else {
          alert(data.message || "Failed to add client");
        }
      }
    } catch (err) {
      alert("Error saving client: " + err.message);
    } finally {
      setIsClientSubmitting(false);
    }
  };

  const resetClientForm = () => {
    setClientName("");
    setClientLogo("");
    setClientCategory(categories[0]?.id || "top-brands");
    setClientShowOnHome(false);
    setEditingClient(null);
  };

  const openEditClient = (client) => {
    setEditingClient(client);
    setClientName(client.name);
    setClientLogo(client.logo);
    setClientCategory(client.category || "top-brands");
    setClientShowOnHome(Boolean(client.showOnHome));
    setShowAddClientModal(true);
  };

  // 3. TOGGLE HOMEPAGE SHOWCASE
  const handleToggleHomepage = async (client) => {
    const newStatus = !client.showOnHome;
    const clientId = client.id || client._id;

    // Optimistic UI update
    setClients((prev) =>
      prev.map((c) =>
        (c.id || c._id) === clientId ? { ...c, showOnHome: newStatus } : c
      )
    );
    setStats((prev) => ({
      ...prev,
      homepageClientsCount: newStatus
        ? prev.homepageClientsCount + 1
        : Math.max(0, prev.homepageClientsCount - 1),
    }));

    try {
      const res = await fetch("/api/admin/clientele", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle_home",
          clientId,
          showOnHome: newStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(
          newStatus
            ? `⭐ "${client.name}" added to Homepage showcase!`
            : `"${client.name}" removed from Homepage showcase.`
        );
      }
    } catch (err) {
      console.error("Toggle error:", err);
      fetchData(); // Rollback
    }
  };

  // 4. DELETE CLIENT
  const handleDeleteClient = async (client) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete "${client.name}"?`
    );
    if (!confirmDelete) return;

    const clientId = client.id || client._id;
    try {
      const res = await fetch(
        `/api/admin/clientele?action=delete_client&id=${clientId}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (data.success) {
        showToast(`"${client.name}" deleted.`);
        fetchData();
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      alert("Error deleting client: " + err.message);
    }
  };

  // 5. DELETE CATEGORY
  const handleDeleteCategory = async (cat) => {
    const count = clients.filter((c) => c.category === cat.id).length;
    const confirmDelete = confirm(
      `Are you sure you want to delete category "${cat.name}"?\nIt currently has ${count} client logo(s).`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `/api/admin/clientele?action=delete_category&id=${cat.id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (data.success) {
        showToast(`Category "${cat.name}" deleted.`);
        fetchData();
      } else {
        alert(data.message || "Failed to delete category");
      }
    } catch (err) {
      alert("Error deleting category: " + err.message);
    }
  };

  // 6. DRAG AND DROP & POSITION REORDERING
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const currentList = [...filteredClients];
    const [movedItem] = currentList.splice(draggedIndex, 1);
    currentList.splice(dropIndex, 0, movedItem);

    // Update global clients array with new relative order
    const updatedIds = currentList.map((c) => c.id || c._id);

    // Reorder state immediately for smooth UI
    setClients((prev) => {
      const remaining = prev.filter((c) => !updatedIds.includes(c.id || c._id));
      return [...currentList, ...remaining];
    });

    setDraggedIndex(null);
    setDragOverIndex(null);

    // Persist to backend
    await saveNewOrder(updatedIds);
  };

  const movePosition = async (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= filteredClients.length) return;

    const currentList = [...filteredClients];
    const temp = currentList[index];
    currentList[index] = currentList[targetIndex];
    currentList[targetIndex] = temp;

    const updatedIds = currentList.map((c) => c.id || c._id);
    setClients((prev) => {
      const remaining = prev.filter((c) => !updatedIds.includes(c.id || c._id));
      return [...currentList, ...remaining];
    });

    await saveNewOrder(updatedIds);
  };

  const saveNewOrder = async (orderedIds) => {
    setIsSavingOrder(true);
    try {
      const res = await fetch("/api/admin/clientele", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reorder_clients",
          orderedIds,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Logos order saved live!");
      }
    } catch (err) {
      console.error("Error saving order:", err);
    } finally {
      setIsSavingOrder(false);
    }
  };

  // Filter logic
  const filteredClients = clients.filter((client) => {
    if (onlyHomepage && !client.showOnHome) return false;
    if (selectedCategory !== "all" && client.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = client.name?.toLowerCase().includes(q);
      const matchCat = client.category?.toLowerCase().includes(q);
      if (!matchName && !matchCat) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium transition-all transform animate-in slide-in-from-bottom-5 ${
            toast.type === "error"
              ? "bg-red-600 text-white"
              : "bg-[#ff7b00] text-white font-semibold shadow-[#ff7b00]/30"
          }`}
        >
          {toast.type === "error" ? <FaXmark /> : <FaCheck />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff7b00] uppercase tracking-wider mb-1 font-bold">
            <span>Website CMS</span>
            <span>•</span>
            <span>Brand Logos & Partners</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <FaBuilding className="text-[#ff7b00]" />
            Clientele & Brand Showcase
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage industry categories, add client logos, toggle homepage showcase, and drag to reorder.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setNewCategoryName("");
              setNewCategoryId("");
              setShowAddCategoryModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 font-medium text-xs sm:text-sm hover:text-white transition-all cursor-pointer"
          >
            <FaPlus className="text-[#ff7b00] text-xs" />
            <span>Add Category</span>
          </button>

          <button
            onClick={() => setShowManageCategoriesModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 font-medium text-xs sm:text-sm hover:text-white transition-all cursor-pointer"
          >
            <FaLayerGroup className="text-indigo-400 text-xs" />
            <span>Manage Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => {
              resetClientForm();
              setShowAddClientModal(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7b00] hover:bg-[#e06d00] text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-[#ff7b00]/25 cursor-pointer"
          >
            <FaPlus className="text-xs" />
            <span>Add New Client</span>
          </button>
        </div>
      </div>

      {/* Dynamic Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Clients Card */}
        <div className="p-5 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl flex items-center gap-4 relative overflow-hidden group hover:border-[#ff7b00]/40 transition">
          <div className="w-12 h-12 rounded-xl bg-[#ff7b00]/10 border border-[#ff7b00]/20 flex items-center justify-center text-[#ff7b00] group-hover:scale-110 transition duration-300">
            <FaBuilding className="text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider font-mono">
              Total Clients
            </p>
            <h3 className="text-2xl font-bold text-white mt-0.5">
              {loading ? (
                <FaCircleNotch className="animate-spin text-sm text-[#ff7b00]" />
              ) : (
                `${stats.totalClients} Clients`
              )}
            </h3>
            <span className="text-[11px] text-gray-500 font-mono">
              Counted from all sectors
            </span>
          </div>
        </div>

        {/* Industry Categories Card */}
        <div className="p-5 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl flex items-center gap-4 relative overflow-hidden group hover:border-indigo-500/40 transition">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition duration-300">
            <FaShapes className="text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider font-mono">
              Industry Sectors
            </p>
            <h3 className="text-2xl font-bold text-white mt-0.5">
              {loading ? (
                <FaCircleNotch className="animate-spin text-sm text-indigo-400" />
              ) : (
                `${stats.totalCategories} Categories`
              )}
            </h3>
            <span className="text-[11px] text-gray-500 font-mono">
              Dedicated sector groups
            </span>
          </div>
        </div>

        {/* Homepage Showcase Card */}
        <div className="p-5 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl flex items-center gap-4 relative overflow-hidden group hover:border-amber-500/40 transition">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition duration-300">
            <FaStar className="text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider font-mono">
              Homepage Showcase
            </p>
            <h3 className="text-2xl font-bold text-white mt-0.5">
              {loading ? (
                <FaCircleNotch className="animate-spin text-sm text-amber-400" />
              ) : (
                `${stats.homepageClientsCount} Featured`
              )}
            </h3>
            <span className="text-[11px] text-gray-500 font-mono">
              Active on Top Brands section
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 rounded-2xl bg-[#140f0d] border border-white/10 shadow-xl space-y-6">
        {/* Controls & Search Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand name or sector..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-[#ff7b00] transition"
            />
          </div>

          {/* Quick Filter Buttons & Links */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setOnlyHomepage(!onlyHomepage)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition cursor-pointer ${
                onlyHomepage
                  ? "bg-[#ff7b00] text-white border-[#ff7b00] font-semibold shadow-lg shadow-[#ff7b00]/25"
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              <FaStar className={onlyHomepage ? "text-white" : "text-amber-400"} />
              <span>Homepage Only ({stats.homepageClientsCount})</span>
            </button>

            <Link
              href="/clientele"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-[#ff7b00] bg-[#ff7b00]/10 border border-[#ff7b00]/20 hover:bg-[#ff7b00]/20 transition"
            >
              <FaEye />
              <span>View Clientele Page</span>
            </Link>

            <button
              onClick={fetchData}
              title="Refresh Data"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition cursor-pointer"
            >
              <FaArrowRotateRight className="text-xs" />
            </button>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              selectedCategory === "all" && !onlyHomepage
                ? "bg-white text-black font-semibold shadow-xs"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
            }`}
          >
            All Categories ({clients.length})
          </button>
          {categories.map((cat) => {
            const count = clients.filter((c) => c.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setOnlyHomepage(false);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? "bg-[#ff7b00] text-white font-semibold shadow-lg shadow-[#ff7b00]/25"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Reordering Helper Tip */}
        <div className="flex items-center justify-between bg-[#ff7b00]/10 border border-[#ff7b00]/20 px-4 py-2.5 rounded-xl text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <span className="text-[#ff7b00] font-bold">💡 Tip:</span>
            <span>
              Drag any card using the grip handle <FaGripVertical className="inline text-gray-400" /> to rearrange logo order. Star ⭐ toggles homepage display.
            </span>
          </div>
          {isSavingOrder && (
            <span className="text-xs text-[#ff7b00] flex items-center gap-1.5 font-mono font-semibold">
              <FaCircleNotch className="animate-spin text-[10px]" />
              <span>Saving order...</span>
            </span>
          )}
        </div>

        {/* Logo Cards Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <FaCircleNotch className="animate-spin text-3xl text-[#ff7b00] mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Loading brand logos & categories...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-[#120e0d] border border-dashed border-white/10">
            <FaBuilding className="text-4xl text-gray-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No Brand Logos Found</h3>
            <p className="text-gray-400 text-xs mt-1 max-w-sm mx-auto">
              {searchQuery
                ? `No clients matched "${searchQuery}".`
                : "No client logos in this category yet. Click '+ Add New Client' to upload one."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredClients.map((client, idx) => {
              const isDragging = draggedIndex === idx;
              const isDragOver = dragOverIndex === idx && draggedIndex !== idx;
              const catObj = categories.find((c) => c.id === client.category);
              const catName = catObj?.name || client.category;

              return (
                <div
                  key={client.id || client._id || idx}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => handleDrop(e, idx)}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between group relative ${
                    isDragging
                      ? "opacity-30 border-dashed border-[#ff7b00] scale-[0.98] bg-[#ff7b00]/10"
                      : isDragOver
                      ? "border-[#ff7b00] ring-2 ring-[#ff7b00]/30 shadow-xl bg-[#ff7b00]/10 scale-[1.02]"
                      : "bg-[#16110f] border-white/10 shadow-lg hover:border-[#ff7b00]/40 hover:shadow-2xl"
                  }`}
                >
                  {/* Top Bar: Drag Grip, Position, Homepage Toggle */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-[#ff7b00] p-1 rounded hover:bg-white/5 transition flex items-center"
                        title="Drag to reorder position"
                      >
                        <FaGripVertical className="text-sm" />
                      </span>
                      <span className="text-[10px] font-mono text-gray-500 font-bold">
                        #{idx + 1}
                      </span>
                    </div>

                    {/* Star Button for Homepage Showcase */}
                    <button
                      type="button"
                      onClick={() => handleToggleHomepage(client)}
                      title={
                        client.showOnHome
                          ? "Featured on Homepage (Click to remove)"
                          : "Click to show on Homepage"
                      }
                      className={`p-1.5 rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer ${
                        client.showOnHome
                          ? "text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20"
                          : "text-gray-500 hover:text-amber-400 hover:bg-white/5"
                      }`}
                    >
                      {client.showOnHome ? (
                        <FaStar className="text-xs" />
                      ) : (
                        <FaRegStar className="text-xs" />
                      )}
                      <span className="text-[10px] font-bold">
                        {client.showOnHome ? "Home" : ""}
                      </span>
                    </button>
                  </div>

                  {/* Logo Preview */}
                  <div className="my-3 h-[110px] rounded-xl bg-[#0c0a09] border border-white/5 flex items-center justify-center p-3 relative overflow-hidden group-hover:border-[#ff7b00]/30 transition">
                    {client.logo ? (
                      <Image
                        src={getAssetPath(client.logo)}
                        alt={client.name}
                        width={140}
                        height={70}
                        className="max-h-[85%] max-w-[85%] w-auto h-auto object-contain select-none transition duration-300 group-hover:scale-105"
                        style={{ width: "auto", height: "auto" }}
                      />
                    ) : (
                      <FaBuilding className="text-gray-600 text-2xl" />
                    )}
                  </div>

                  {/* Brand Info */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white truncate" title={client.name}>
                      {client.name}
                    </h4>
                    <span className="inline-block text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 truncate max-w-full">
                      {catName}
                    </span>
                  </div>

                  {/* Action Bar: Move Up/Down, Edit, Delete */}
                  <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => movePosition(idx, "up")}
                        title="Move Left / Up"
                        className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition cursor-pointer"
                      >
                        <FaArrowUp className="text-[10px]" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === filteredClients.length - 1}
                        onClick={() => movePosition(idx, "down")}
                        title="Move Right / Down"
                        className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition cursor-pointer"
                      >
                        <FaArrowDown className="text-[10px]" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditClient(client)}
                        title="Edit Client"
                        className="p-1.5 rounded bg-white/5 hover:bg-[#ff7b00]/20 hover:text-[#ff7b00] text-gray-400 transition cursor-pointer"
                      >
                        <FaPenToSquare className="text-[10px]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClient(client)}
                        title="Delete Client"
                        className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
                      >
                        <FaTrashCan className="text-[10px]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL 1: ADD CATEGORY */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#191412] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FaShapes className="text-[#ff7b00]" />
                <span>Add Industry Category</span>
              </h3>
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="text-gray-400 hover:text-white p-1 cursor-pointer"
              >
                <FaXmark />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCategoryName}
                  onChange={(e) => {
                    setNewCategoryName(e.target.value);
                    if (!newCategoryId || newCategoryId === newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-")) {
                      setNewCategoryId(
                        e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                      );
                    }
                  }}
                  placeholder="e.g. Artificial Intelligence & Tech"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff7b00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                  Category Slug / ID
                </label>
                <input
                  type="text"
                  value={newCategoryId}
                  onChange={(e) => setNewCategoryId(e.target.value)}
                  placeholder="e.g. ai-tech"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-xs font-mono text-[#ff7b00] font-semibold focus:outline-none focus:border-[#ff7b00]"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Unique identifier used in sector dropdowns and URL filters.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCategorySubmitting}
                  className="px-5 py-2.5 rounded-xl bg-[#ff7b00] hover:bg-[#e06d00] text-white font-semibold text-xs transition disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-[#ff7b00]/25 cursor-pointer"
                >
                  {isCategorySubmitting ? (
                    <FaCircleNotch className="animate-spin text-xs" />
                  ) : (
                    <FaPlus className="text-xs" />
                  )}
                  <span>Create Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT CLIENT LOGO */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#191412] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FaBuilding className="text-[#ff7b00]" />
                <span>{editingClient ? "Edit Client Logo" : "Add New Client Logo"}</span>
              </h3>
              <button
                onClick={() => {
                  setShowAddClientModal(false);
                  resetClientForm();
                }}
                className="text-gray-400 hover:text-white p-1 cursor-pointer"
              >
                <FaXmark />
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="space-y-4">
              {/* Brand Name */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                  Brand / Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Tim Hortons"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff7b00]"
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                  Industry Category *
                </label>
                <select
                  value={clientCategory}
                  onChange={(e) => setClientCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff7b00] cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-[#191412] text-white">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Logo Upload & Preview */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-bold mb-1.5">
                  Brand Logo Image (.webp, &lt; 250 KB) *
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".webp,image/webp,image/png,image/jpeg"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingLogo}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    {isUploadingLogo ? (
                      <FaCircleNotch className="animate-spin text-xs text-[#ff7b00]" />
                    ) : (
                      <FaUpload className="text-xs text-[#ff7b00]" />
                    )}
                    <span>{isUploadingLogo ? "Uploading..." : "Upload Logo"}</span>
                  </button>

                  <input
                    type="text"
                    value={clientLogo}
                    onChange={(e) => setClientLogo(e.target.value)}
                    placeholder="or enter /img/... path"
                    className="w-full sm:flex-1 px-3.5 py-2.5 rounded-xl bg-[#120e0d] border border-white/10 text-xs font-mono text-[#ff7b00] placeholder-gray-500 focus:outline-none focus:border-[#ff7b00]"
                  />
                </div>

                {/* Preview Box */}
                {clientLogo && (
                  <div className="mt-3 p-3 rounded-xl bg-[#0c0a09] border border-white/10 flex items-center justify-center h-[90px]">
                    <Image
                      src={getAssetPath(clientLogo)}
                      alt="Logo Preview"
                      width={120}
                      height={60}
                      className="max-h-[70px] max-w-[80%] w-auto h-auto object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                )}
              </div>

              {/* Homepage Showcase Checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#120e0d] border border-white/10 cursor-pointer hover:border-[#ff7b00]/30 transition">
                  <input
                    type="checkbox"
                    checked={clientShowOnHome}
                    onChange={(e) => setClientShowOnHome(e.target.checked)}
                    className="w-4 h-4 rounded text-[#ff7b00] accent-[#ff7b00] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <FaStar className="text-amber-400 text-xs" />
                      <span>Feature on Homepage "Top Brands" Section</span>
                    </span>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Check this to display this brand logo in the marquee / showcase on the homepage.
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddClientModal(false);
                    resetClientForm();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isClientSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-[#ff7b00] hover:bg-[#e06d00] text-white font-semibold text-xs transition disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-[#ff7b00]/25 cursor-pointer"
                >
                  {isClientSubmitting ? (
                    <FaCircleNotch className="animate-spin text-xs" />
                  ) : (
                    <FaCheck className="text-xs" />
                  )}
                  <span>{editingClient ? "Save Changes" : "Add Client"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: MANAGE CATEGORIES MODAL */}
      {showManageCategoriesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-[#191412] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FaLayerGroup className="text-indigo-400" />
                <span>Manage Industry Categories ({categories.length})</span>
              </h3>
              <button
                onClick={() => setShowManageCategoriesModal(false)}
                className="text-gray-400 hover:text-white p-1 cursor-pointer"
              >
                <FaXmark />
              </button>
            </div>

            {/* Category List */}
            <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-white/10">
              {categories.map((cat, idx) => {
                const count = clients.filter((c) => c.category === cat.id).length;
                return (
                  <div
                    key={cat.id}
                    className="p-3.5 rounded-xl bg-[#140f0d] border border-white/10 flex items-center justify-between hover:border-white/20 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-gray-400 font-bold">#{idx + 1}</span>
                        <h4 className="text-sm font-bold text-white">{cat.name}</h4>
                      </div>
                      <span className="text-[11px] font-mono text-[#ff7b00] font-semibold mt-0.5 inline-block">
                        ID: {cat.id} • {count} client logos
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat)}
                      title="Delete category"
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition cursor-pointer"
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setShowManageCategoriesModal(false);
                  setShowAddCategoryModal(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white border border-white/10 transition cursor-pointer"
              >
                <FaPlus className="text-[#ff7b00]" />
                <span>Add Another Category</span>
              </button>

              <button
                type="button"
                onClick={() => setShowManageCategoriesModal(false)}
                className="px-5 py-2 rounded-xl bg-[#ff7b00] hover:bg-[#e06d00] text-white font-semibold text-xs shadow-lg shadow-[#ff7b00]/25 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
