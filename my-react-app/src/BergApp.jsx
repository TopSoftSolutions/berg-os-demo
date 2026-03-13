import { useState, useMemo } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from "recharts";
import { 
  Home, FolderTree, Calculator, Package, Warehouse, FileText, CheckSquare, BookOpen, Settings,
  Search, Bell, Plus, ChevronDown, ChevronRight, ChevronLeft, ArrowRight, ArrowLeftRight, ExternalLink,
  AlertTriangle, Clock, Users, TrendingUp, TrendingDown, Filter, MoreVertical,
  Camera, Upload, Check, X, Edit, Trash2, Copy, Save, Send, Eye, Download,
  Building2, MapPin, Calendar, DollarSign, Layers, Truck, ClipboardList,
  ArrowUpRight, ArrowDownRight, RefreshCw, Menu, UserCircle, LogOut,
  LayoutGrid, List, FileSpreadsheet, Hammer, Wrench, Zap, CircleDot
} from "lucide-react";

import berglogo from './assets/Berg-Construction-Company.png';

// ============================================================
// MOCK DATA (inline for single-file artifact)
// ============================================================

const users = [
  { id: 'u1', name: 'Tigran Harutyunyan', role: 'Director', initials: 'TH' },
  { id: 'u2', name: 'Lilit Sargsyan', role: 'Commercial Manager', initials: 'LS' },
  { id: 'u3', name: 'Narek Petrosyan', role: 'Project Manager', initials: 'NP' },
  { id: 'u4', name: 'Ani Mkrtchyan', role: 'Cost Engineer', initials: 'AM' },
  { id: 'u5', name: 'Vardan Melkonyan', role: 'Superintendent', initials: 'VM' },
  { id: 'u6', name: 'Karen Avetisyan', role: 'Warehouse Manager', initials: 'KA' },
  { id: 'u7', name: 'Mariam Hovhannisyan', role: 'Approver', initials: 'MH' },
];

const clients = [
  { id: 'c1', name: 'Ameria Business Center' },
  { id: 'c2', name: 'Riverside Development CJSC' },
  { id: 'c3', name: 'CityMall Armenia' },
  { id: 'c4', name: 'Ararat Bank' },
  { id: 'c5', name: 'Cascade Offices LLC' },
];

const projects = [
  { id: 'p1', code: 'BRG-24017', name: 'Ameria Business Center – 3rd Floor Renovation', clientId: 'c1', type: 'Office Interior', stage: 'Execution', pmId: 'u3', superintendentId: 'u5', baseline: 84000000, actual: 61450000, completion: 72, risk: 'Medium', lastUpdate: '2025-03-07' },
  { id: 'p2', code: 'BRG-24021', name: 'Riverside Apartments – Block B Fit-Out', clientId: 'c2', type: 'Residential Fit-Out', stage: 'Execution', pmId: 'u3', superintendentId: 'u5', baseline: 215000000, actual: 142700000, completion: 58, risk: 'High', lastUpdate: '2025-03-09' },
  { id: 'p3', code: 'BRG-24025', name: 'CityMall Food Court Refurbishment', clientId: 'c3', type: 'Commercial Interior', stage: 'Finishing', pmId: 'u3', superintendentId: 'u5', baseline: 128000000, actual: 123600000, completion: 91, risk: 'Medium', lastUpdate: '2025-03-08' },
  { id: 'p4', code: 'BRG-24029', name: 'Ararat Bank – Arabkir Branch Prototype', clientId: 'c4', type: 'Bank Branch Interior', stage: 'Estimating', pmId: 'u3', superintendentId: 'u5', baseline: 46500000, actual: 4250000, completion: 8, risk: 'Low', lastUpdate: '2025-03-09' },
  { id: 'p5', code: 'BRG-24031', name: 'Cascade Offices – Level 5 Upgrade', clientId: 'c5', type: 'Office Upgrade', stage: 'Mobilization', pmId: 'u3', superintendentId: 'u5', baseline: 67300000, actual: 9840000, completion: 14, risk: 'Low', lastUpdate: '2025-03-06' },
];

const projectNodes = {
  'p2': [
    { id: 'n1', name: 'Block B', code: 'B', parentId: null, level: 0, type: 'Block', responsible: 'u3', baseline: 215000000, actual: 142700000, progress: 58 },
    { id: 'n2', name: 'Floor 1', code: 'B-F1', parentId: 'n1', level: 1, type: 'Floor', responsible: 'u5', baseline: 52000000, actual: 41200000, progress: 78 },
    { id: 'n3', name: 'Apartment 101', code: 'B-F1-101', parentId: 'n2', level: 2, type: 'Apartment', responsible: 'u5', baseline: 18500000, actual: 15800000, progress: 85 },
    { id: 'n4', name: 'Apartment 102', code: 'B-F1-102', parentId: 'n2', level: 2, type: 'Apartment', responsible: 'u5', baseline: 19200000, actual: 14600000, progress: 75 },
    { id: 'n5', name: 'Corridor F1', code: 'B-F1-COR', parentId: 'n2', level: 2, type: 'Corridor', responsible: 'u5', baseline: 14300000, actual: 10800000, progress: 72 },
    { id: 'n6', name: 'Floor 2', code: 'B-F2', parentId: 'n1', level: 1, type: 'Floor', responsible: 'u5', baseline: 68000000, actual: 42500000, progress: 55 },
    { id: 'n7', name: 'Apartment 201', code: 'B-F2-201', parentId: 'n6', level: 2, type: 'Apartment', responsible: 'u5', baseline: 19800000, actual: 12400000, progress: 52 },
    { id: 'n8', name: 'Apartment 202', code: 'B-F2-202', parentId: 'n6', level: 2, type: 'Apartment', responsible: 'u5', baseline: 18900000, actual: 11200000, progress: 48 },
    { id: 'n9', name: 'Apartment 203', code: 'B-F2-203', parentId: 'n6', level: 2, type: 'Apartment', responsible: 'u5', baseline: 17500000, actual: 9800000, progress: 44 },
    { id: 'n10', name: 'Corridor F2', code: 'B-F2-COR', parentId: 'n6', level: 2, type: 'Corridor', responsible: 'u5', baseline: 11800000, actual: 9100000, progress: 68 },
    { id: 'n11', name: 'Floor 3', code: 'B-F3', parentId: 'n1', level: 1, type: 'Floor', responsible: 'u5', baseline: 55000000, actual: 28000000, progress: 40 },
    { id: 'n12', name: 'Apartment 301', code: 'B-F3-301', parentId: 'n11', level: 2, type: 'Apartment', responsible: 'u5', baseline: 22500000, actual: 11800000, progress: 38 },
    { id: 'n13', name: 'Apartment 302', code: 'B-F3-302', parentId: 'n11', level: 2, type: 'Apartment', responsible: 'u5', baseline: 21200000, actual: 9600000, progress: 35 },
    { id: 'n14', name: 'Lobby', code: 'B-LOB', parentId: 'n1', level: 1, type: 'Common Area', responsible: 'u5', baseline: 18000000, actual: 14200000, progress: 72 },
    { id: 'n15', name: 'Staircore', code: 'B-STR', parentId: 'n1', level: 1, type: 'Common Area', responsible: 'u5', baseline: 12000000, actual: 10400000, progress: 82 },
    { id: 'n16', name: 'Technical Room', code: 'B-TECH', parentId: 'n1', level: 1, type: 'Technical', responsible: 'u5', baseline: 10000000, actual: 6400000, progress: 55 },
  ],
  'p1': [
    { id: 'an1', name: 'Building Main', code: 'MAIN', parentId: null, level: 0, type: 'Building', responsible: 'u3', baseline: 84000000, actual: 61450000, progress: 72 },
    { id: 'an2', name: 'Level 3', code: 'MAIN-L3', parentId: 'an1', level: 1, type: 'Floor', responsible: 'u5', baseline: 84000000, actual: 61450000, progress: 72 },
    { id: 'an3', name: 'Reception', code: 'MAIN-L3-REC', parentId: 'an2', level: 2, type: 'Room', responsible: 'u5', baseline: 14200000, actual: 11800000, progress: 82 },
    { id: 'an4', name: 'Open Office East', code: 'MAIN-L3-OE', parentId: 'an2', level: 2, type: 'Room', responsible: 'u5', baseline: 22500000, actual: 17200000, progress: 75 },
    { id: 'an5', name: 'Open Office West', code: 'MAIN-L3-OW', parentId: 'an2', level: 2, type: 'Room', responsible: 'u5', baseline: 21800000, actual: 15400000, progress: 68 },
    { id: 'an6', name: 'Meeting Room 01', code: 'MAIN-L3-MR1', parentId: 'an2', level: 2, type: 'Room', responsible: 'u5', baseline: 6800000, actual: 5200000, progress: 76 },
    { id: 'an7', name: 'Meeting Room 02', code: 'MAIN-L3-MR2', parentId: 'an2', level: 2, type: 'Room', responsible: 'u5', baseline: 6500000, actual: 4800000, progress: 73 },
    { id: 'an8', name: 'Executive Office', code: 'MAIN-L3-EXO', parentId: 'an2', level: 2, type: 'Room', responsible: 'u5', baseline: 8200000, actual: 4800000, progress: 55 },
    { id: 'an9', name: 'Pantry', code: 'MAIN-L3-PNT', parentId: 'an2', level: 2, type: 'Room', responsible: 'u5', baseline: 4000000, actual: 2250000, progress: 52 },
  ],
  'p4': [
    { id: 'ab1', name: 'Arabkir Branch', code: 'ARB', parentId: null, level: 0, type: 'Building', responsible: 'u3', baseline: 46500000, actual: 4250000, progress: 8 },
    { id: 'ab2', name: 'Ground Floor', code: 'ARB-GF', parentId: 'ab1', level: 1, type: 'Floor', responsible: 'u5', baseline: 32500000, actual: 3200000, progress: 10 },
    { id: 'ab3', name: 'Client Hall', code: 'ARB-GF-CH', parentId: 'ab2', level: 2, type: 'Room', responsible: 'u5', baseline: 12800000, actual: 1200000, progress: 8 },
    { id: 'ab4', name: 'Teller Zone', code: 'ARB-GF-TZ', parentId: 'ab2', level: 2, type: 'Room', responsible: 'u5', baseline: 8500000, actual: 850000, progress: 10 },
    { id: 'ab5', name: 'Self-Service Area', code: 'ARB-GF-SS', parentId: 'ab2', level: 2, type: 'Room', responsible: 'u5', baseline: 4200000, actual: 380000, progress: 5 },
    { id: 'ab6', name: 'Entrance Vestibule', code: 'ARB-GF-EV', parentId: 'ab2', level: 2, type: 'Room', responsible: 'u5', baseline: 3500000, actual: 420000, progress: 12 },
    { id: 'ab7', name: 'WC Public', code: 'ARB-GF-WC', parentId: 'ab2', level: 2, type: 'Room', responsible: 'u5', baseline: 3500000, actual: 350000, progress: 8 },
    { id: 'ab8', name: 'Back Office', code: 'ARB-BO', parentId: 'ab1', level: 1, type: 'Zone', responsible: 'u5', baseline: 14000000, actual: 1050000, progress: 6 },
    { id: 'ab9', name: 'Manager Office', code: 'ARB-BO-MO', parentId: 'ab8', level: 2, type: 'Room', responsible: 'u5', baseline: 5200000, actual: 400000, progress: 5 },
    { id: 'ab10', name: 'Staff Room', code: 'ARB-BO-SR', parentId: 'ab8', level: 2, type: 'Room', responsible: 'u5', baseline: 3800000, actual: 350000, progress: 7 },
    { id: 'ab11', name: 'Server / IT Room', code: 'ARB-BO-IT', parentId: 'ab8', level: 2, type: 'Room', responsible: 'u5', baseline: 3200000, actual: 200000, progress: 4 },
    { id: 'ab12', name: 'WC Staff', code: 'ARB-BO-WCS', parentId: 'ab8', level: 2, type: 'Room', responsible: 'u5', baseline: 1800000, actual: 100000, progress: 3 },
  ]
};

const materials = [
  { id: 'm1', sku: 'MAT-001', name: 'Gypsum Board 12.5mm', category: 'Drywall', unit: 'sheet', cost: 3200 },
  { id: 'm2', sku: 'MAT-002', name: 'Moisture Resistant Board 12.5mm', category: 'Drywall', unit: 'sheet', cost: 4800 },
  { id: 'm3', sku: 'MAT-003', name: 'Metal Stud 50mm', category: 'Framing', unit: 'lm', cost: 850 },
  { id: 'm4', sku: 'MAT-004', name: 'Metal Track 50mm', category: 'Framing', unit: 'lm', cost: 780 },
  { id: 'm5', sku: 'MAT-005', name: 'Drywall Screws 25mm', category: 'Fasteners', unit: 'box', cost: 2400 },
  { id: 'm6', sku: 'MAT-006', name: 'Joint Tape', category: 'Drywall', unit: 'roll', cost: 1200 },
  { id: 'm7', sku: 'MAT-007', name: 'Joint Compound 20kg', category: 'Drywall', unit: 'bag', cost: 4500 },
  { id: 'm8', sku: 'MAT-008', name: 'Mineral Wool 50mm', category: 'Insulation', unit: 'pack', cost: 6800 },
  { id: 'm9', sku: 'MAT-009', name: 'Primer Deep Penetration 10L', category: 'Paint', unit: 'can', cost: 5200 },
  { id: 'm10', sku: 'MAT-010', name: 'Interior Paint White 15L', category: 'Paint', unit: 'bucket', cost: 12500 },
  { id: 'm11', sku: 'MAT-011', name: 'Ceramic Tile 600x600 Grey', category: 'Tile', unit: 'sqm', cost: 8500 },
  { id: 'm12', sku: 'MAT-012', name: 'Tile Adhesive 25kg', category: 'Tile', unit: 'bag', cost: 3800 },
  { id: 'm13', sku: 'MAT-013', name: 'Tile Grout 5kg', category: 'Tile', unit: 'bag', cost: 2200 },
  { id: 'm14', sku: 'MAT-014', name: 'LED Panel 600x600', category: 'Electrical', unit: 'pcs', cost: 18500 },
  { id: 'm15', sku: 'MAT-015', name: 'Electrical Cable NYM 3x2.5', category: 'Electrical', unit: 'meter', cost: 420 },
  { id: 'm16', sku: 'MAT-016', name: 'PVC Conduit 20mm', category: 'Electrical', unit: 'meter', cost: 180 },
  { id: 'm17', sku: 'MAT-017', name: 'Switch Socket Set White', category: 'Electrical', unit: 'set', cost: 3500 },
  { id: 'm18', sku: 'MAT-018', name: 'Glass Partition Module', category: 'Partitions', unit: 'module', cost: 45000 },
  { id: 'm19', sku: 'MAT-019', name: 'Door Leaf MDF White', category: 'Doors', unit: 'pcs', cost: 28000 },
  { id: 'm20', sku: 'MAT-020', name: 'Laminate Flooring AC4 Oak', category: 'Flooring', unit: 'sqm', cost: 7200 },
  { id: 'm21', sku: 'MAT-021', name: 'Skirting PVC White', category: 'Flooring', unit: 'lm', cost: 650 },
  { id: 'm22', sku: 'MAT-022', name: 'Silicone Sealant White', category: 'Sealants', unit: 'tube', cost: 1800 },
];

const suppliers = [
  { id: 's1', name: 'BuildMart LLC' }, { id: 's2', name: 'ProfiShin LLC' },
  { id: 's3', name: 'MegaCeram Armenia' }, { id: 's4', name: 'ElectroHouse' },
  { id: 's5', name: 'GlassLine Studio' }, { id: 's6', name: 'NorNerk Paints' },
];

const materialRequests = [
  { id: 'MR-24101', projectId: 'p2', nodeId: 'n7', requestedBy: 'u5', neededBy: '2025-03-12', priority: 'Normal', status: 'Fulfilled', itemCount: 5, source: 'Central Warehouse', created: '2025-03-01',
    items: [
      { material: 'Gypsum Board 12.5mm', requestedQty: 24, unit: 'sheet', availableQty: 80, approvedQty: 24, fulfilledQty: 24, suggestedSource: 'Central Warehouse' },
      { material: 'Metal Stud 50mm', requestedQty: 35, unit: 'lm', availableQty: 120, approvedQty: 35, fulfilledQty: 35, suggestedSource: 'Central Warehouse' },
      { material: 'Metal Track 50mm', requestedQty: 30, unit: 'lm', availableQty: 95, approvedQty: 30, fulfilledQty: 30, suggestedSource: 'Central Warehouse' },
      { material: 'Drywall Screws 25mm', requestedQty: 3, unit: 'box', availableQty: 18, approvedQty: 3, fulfilledQty: 3, suggestedSource: 'Central Warehouse' },
      { material: 'Joint Compound 20kg', requestedQty: 4, unit: 'bag', availableQty: 22, approvedQty: 4, fulfilledQty: 4, suggestedSource: 'Central Warehouse' },
    ] },
  { id: 'MR-24102', projectId: 'p2', nodeId: 'n8', requestedBy: 'u5', neededBy: '2025-03-14', priority: 'Normal', status: 'Approved', itemCount: 4, source: 'Central Warehouse', created: '2025-03-03',
    items: [
      { material: 'Ceramic Tile 600x600 Grey', requestedQty: 18, unit: 'sqm', availableQty: 45, approvedQty: 18, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'Tile Adhesive 25kg', requestedQty: 6, unit: 'bag', availableQty: 30, approvedQty: 6, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'Tile Grout 5kg', requestedQty: 3, unit: 'bag', availableQty: 12, approvedQty: 3, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'Silicone Sealant White', requestedQty: 2, unit: 'tube', availableQty: 8, approvedQty: 2, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
    ] },
  { id: 'MR-24103', projectId: 'p2', nodeId: 'n9', requestedBy: 'u5', neededBy: '2025-03-15', priority: 'Urgent', status: 'Pending Approval', itemCount: 3, source: 'Purchase Required', created: '2025-03-05',
    items: [
      { material: 'Ceramic Tile 600x600 Grey', requestedQty: 22, unit: 'sqm', availableQty: 27, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Purchase', note: 'Specific pattern for Apt 203 bathroom' },
      { material: 'Tile Adhesive 25kg', requestedQty: 8, unit: 'bag', availableQty: 24, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Purchase' },
      { material: 'Tile Grout 5kg', requestedQty: 4, unit: 'bag', availableQty: 9, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Purchase' },
    ] },
  { id: 'MR-24104', projectId: 'p1', nodeId: 'an4', requestedBy: 'u5', neededBy: '2025-03-11', priority: 'Urgent', status: 'Partially Fulfilled', itemCount: 4, source: 'Mixed', created: '2025-03-02',
    items: [
      { material: 'LED Panel 600x600', requestedQty: 12, unit: 'pcs', availableQty: 8, approvedQty: 12, fulfilledQty: 8, suggestedSource: 'Central Warehouse', note: 'Remaining 4 on purchase order' },
      { material: 'Electrical Cable NYM 3x2.5', requestedQty: 200, unit: 'meter', availableQty: 350, approvedQty: 200, fulfilledQty: 200, suggestedSource: 'Central Warehouse' },
      { material: 'PVC Conduit 20mm', requestedQty: 120, unit: 'meter', availableQty: 180, approvedQty: 120, fulfilledQty: 120, suggestedSource: 'Central Warehouse' },
      { material: 'Switch Socket Set White', requestedQty: 8, unit: 'set', availableQty: 5, approvedQty: 8, fulfilledQty: 5, suggestedSource: 'Purchase', note: '3 sets on backorder' },
    ] },
  { id: 'MR-24105', projectId: 'p2', nodeId: 'n10', requestedBy: 'u5', neededBy: '2025-03-18', priority: 'Normal', status: 'Submitted', itemCount: 3, source: 'Central Warehouse', created: '2025-03-07',
    items: [
      { material: 'Primer Deep Penetration 10L', requestedQty: 4, unit: 'can', availableQty: 10, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'Interior Paint White 15L', requestedQty: 6, unit: 'bucket', availableQty: 8, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'Skirting PVC White', requestedQty: 40, unit: 'lm', availableQty: 65, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
    ] },
  { id: 'MR-24106', projectId: 'p2', nodeId: 'n16', requestedBy: 'u5', neededBy: '2025-03-20', priority: 'Normal', status: 'Draft', itemCount: 2, source: 'TBD', created: '2025-03-09',
    items: [
      { material: 'Electrical Cable NYM 3x2.5', requestedQty: 150, unit: 'meter', availableQty: 150, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'PVC Conduit 20mm', requestedQty: 80, unit: 'meter', availableQty: 100, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
    ] },
  { id: 'MR-24107', projectId: 'p3', nodeId: null, requestedBy: 'u5', neededBy: '2025-03-13', priority: 'Normal', status: 'Fulfilled', itemCount: 2, source: 'Central Warehouse', created: '2025-02-28',
    items: [
      { material: 'Interior Paint White 15L', requestedQty: 10, unit: 'bucket', availableQty: 18, approvedQty: 10, fulfilledQty: 10, suggestedSource: 'Central Warehouse' },
      { material: 'Primer Deep Penetration 10L', requestedQty: 5, unit: 'can', availableQty: 15, approvedQty: 5, fulfilledQty: 5, suggestedSource: 'Central Warehouse' },
    ] },
  { id: 'MR-24108', projectId: 'p2', nodeId: 'n9', requestedBy: 'u5', neededBy: '2025-03-22', priority: 'Urgent', status: 'Submitted', itemCount: 6, source: 'Mixed', created: '2025-03-09',
    items: [
      { material: 'Gypsum Board 12.5mm', requestedQty: 30, unit: 'sheet', availableQty: 56, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'Metal Stud 50mm', requestedQty: 40, unit: 'lm', availableQty: 85, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'Metal Track 50mm', requestedQty: 35, unit: 'lm', availableQty: 65, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'Drywall Screws 25mm', requestedQty: 4, unit: 'box', availableQty: 15, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'Joint Compound 20kg', requestedQty: 5, unit: 'bag', availableQty: 18, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'Mineral Wool 50mm', requestedQty: 8, unit: 'pack', availableQty: 3, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Purchase', note: 'Only 3 in stock — 5 packs need purchasing' },
    ] },
  { id: 'MR-24109', projectId: 'p1', nodeId: 'an5', requestedBy: 'u5', neededBy: '2025-03-16', priority: 'Normal', status: 'Approved', itemCount: 3, source: 'Central Warehouse', created: '2025-03-04',
    items: [
      { material: 'Laminate Flooring AC4 Oak', requestedQty: 45, unit: 'sqm', availableQty: 60, approvedQty: 45, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'Skirting PVC White', requestedQty: 55, unit: 'lm', availableQty: 65, approvedQty: 55, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'Silicone Sealant White', requestedQty: 3, unit: 'tube', availableQty: 6, approvedQty: 3, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
    ] },
  { id: 'MR-24110', projectId: 'p2', nodeId: 'n14', requestedBy: 'u5', neededBy: '2025-03-25', priority: 'Normal', status: 'Submitted', itemCount: 4, source: 'Central Warehouse', created: '2025-03-08',
    items: [
      { material: 'Ceramic Tile 600x600 Grey', requestedQty: 35, unit: 'sqm', availableQty: 45, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'Tile Adhesive 25kg', requestedQty: 12, unit: 'bag', availableQty: 30, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'Tile Grout 5kg', requestedQty: 5, unit: 'bag', availableQty: 12, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
      { material: 'LED Panel 600x600', requestedQty: 6, unit: 'pcs', availableQty: 12, approvedQty: 0, fulfilledQty: 0, suggestedSource: 'Central Warehouse' },
    ] },
];

const deliveries = [
  { id: 'DL-24039', source: 'BuildMart LLC', projectId: 'p2', nodeId: 'n7', expectedDate: '2025-02-25', receivedDate: '2025-02-25', acceptedBy: 'u5', status: 'Accepted', discrepancy: false, linkedMR: 'MR-24101',
    items: [
      { material: 'Gypsum Board 12.5mm', expected: 30, received: 30, condition: 'OK', note: '' },
      { material: 'Metal Stud 50mm', expected: 40, received: 40, condition: 'OK', note: '' },
      { material: 'Metal Track 50mm', expected: 30, received: 30, condition: 'OK', note: '' },
    ],
    photos: [
      { id: 'dp1', caption: 'Truck unloading at Block B entrance', tag: 'Unloading', time: '09:12' },
      { id: 'dp2', caption: 'Gypsum board pallets – 30 sheets counted', tag: 'Verification', time: '09:25' },
      { id: 'dp3', caption: 'Stud profiles stacked in staging area', tag: 'Verification', time: '09:28' },
      { id: 'dp4', caption: 'Delivery note signed by superintendent', tag: 'Documentation', time: '09:35' },
    ] },
  { id: 'DL-24040', source: 'MegaCeram Armenia', projectId: 'p2', nodeId: 'n3', expectedDate: '2025-02-28', receivedDate: '2025-02-28', acceptedBy: 'u5', status: 'Accepted', discrepancy: false,
    items: [
      { material: 'Ceramic Tile 600x600 Grey', expected: 25, received: 25, condition: 'OK', note: '' },
      { material: 'Tile Adhesive 25kg', expected: 8, received: 8, condition: 'OK', note: '' },
      { material: 'Tile Grout 5kg', expected: 4, received: 4, condition: 'OK', note: '' },
    ],
    photos: [
      { id: 'dp5', caption: 'Tile boxes on pallet – batch labels visible', tag: 'Verification', time: '10:40' },
      { id: 'dp6', caption: 'Adhesive bags – 8 bags confirmed', tag: 'Verification', time: '10:45' },
      { id: 'dp7', caption: 'Materials stored in Apt 101 staging', tag: 'Storage', time: '11:00' },
    ] },
  { id: 'DL-24041', source: 'ElectroHouse', projectId: 'p1', nodeId: 'an4', expectedDate: '2025-03-04', receivedDate: '2025-03-04', acceptedBy: 'u5', status: 'Accepted with Discrepancy', discrepancy: true, discrepancyNote: '2 LED panels had cracked diffusers', linkedMR: 'MR-24104',
    items: [
      { material: 'LED Panel 600x600', expected: 12, received: 12, condition: 'Damaged', note: '2 panels with cracked diffusers — replacement ordered' },
      { material: 'Electrical Cable NYM 3x2.5', expected: 200, received: 200, condition: 'OK', note: '' },
      { material: 'PVC Conduit 20mm', expected: 120, received: 120, condition: 'OK', note: '' },
    ],
    photos: [
      { id: 'dp8', caption: 'LED panel box opened – visible crack on diffuser', tag: 'Damage', time: '14:10' },
      { id: 'dp9', caption: 'Close-up of cracked diffuser panel #1', tag: 'Damage', time: '14:12' },
      { id: 'dp10', caption: 'Second damaged panel – corner impact', tag: 'Damage', time: '14:15' },
      { id: 'dp11', caption: 'Remaining 10 panels inspected – no issues', tag: 'Verification', time: '14:25' },
      { id: 'dp12', caption: 'Cable reels – 200m verified', tag: 'Verification', time: '14:30' },
      { id: 'dp13', caption: 'Supplier delivery note with discrepancy annotation', tag: 'Documentation', time: '14:40' },
    ] },
  { id: 'DL-24042', source: 'ProfiShin LLC', projectId: 'p1', nodeId: 'an5', expectedDate: '2025-03-06', receivedDate: '2025-03-06', acceptedBy: 'u5', status: 'Accepted with Discrepancy', discrepancy: true, discrepancyNote: '5 sqm laminate missing – backorder Mar 10', linkedMR: 'MR-24109',
    items: [
      { material: 'Laminate Flooring AC4 Oak', expected: 50, received: 45, condition: 'Incomplete', note: '5 sqm short — backorder confirmed for Mar 10' },
      { material: 'Skirting PVC White', expected: 60, received: 60, condition: 'OK', note: '' },
    ],
    photos: [
      { id: 'dp14', caption: 'Laminate boxes counted – 45 sqm only', tag: 'Verification', time: '11:20' },
      { id: 'dp15', caption: 'Packing list showing 50 sqm – 5 sqm short', tag: 'Documentation', time: '11:22' },
      { id: 'dp16', caption: 'Skirting bundles – all 60 lm received', tag: 'Verification', time: '11:30' },
      { id: 'dp17', caption: 'Materials placed in Open Office West staging', tag: 'Storage', time: '11:45' },
    ] },
  { id: 'DL-24043', source: 'NorNerk Paints', projectId: 'p3', nodeId: null, expectedDate: '2025-03-07', receivedDate: '2025-03-07', acceptedBy: 'u5', status: 'Accepted', discrepancy: false,
    items: [
      { material: 'Interior Paint White 15L', expected: 10, received: 10, condition: 'OK', note: '' },
      { material: 'Primer Deep Penetration 10L', expected: 5, received: 5, condition: 'OK', note: '' },
    ],
    photos: [
      { id: 'dp18', caption: 'Paint buckets – 10 × 15L White confirmed', tag: 'Verification', time: '08:50' },
      { id: 'dp19', caption: 'Primer cans – 5 × 10L confirmed', tag: 'Verification', time: '08:55' },
      { id: 'dp20', caption: 'Batch numbers recorded for paint', tag: 'Documentation', time: '09:00' },
    ] },
  { id: 'DL-24044', source: 'BuildMart LLC', projectId: 'p2', nodeId: 'n16', expectedDate: '2025-03-10', receivedDate: null, acceptedBy: null, status: 'Pending Receipt', discrepancy: false, linkedMR: 'MR-24106',
    items: [
      { material: 'Gypsum Board 12.5mm', expected: 20, received: 0, condition: null, note: '' },
      { material: 'Mineral Wool 50mm', expected: 10, received: 0, condition: null, note: '' },
      { material: 'Metal Stud 50mm', expected: 25, received: 0, condition: null, note: '' },
    ],
    photos: [] },
];

const workPackages = ['Stud Framing','Gypsum Board Installation','Taping / Jointing','Painting First Coat','Painting Final Coat','Tile Laying','Cable Pulling','Conduit Installation','Ceiling Grid Installation','Flooring Installation','Door Installation','Glass Partition Install','Plumbing Rough-In','HVAC Duct Work','Skirting / Trim'];

const weeklyReports = [
  { id: 'WR-2501', week: 'W09 2025', projectId: 'p2', nodeId: 'n7', submittedBy: 'u5', submittedDate: '2025-03-07', progress: 52, prevProgress: 45, completeness: 'Submitted', summary: 'Drywall installation 85% complete. Tile work started in bathroom.',
    sections: { completed: 'Drywall boarding on all walls. Insulation installed.', inProgress: 'Bathroom tiling, joint taping.', blocked: 'None this week.', qualityIssues: 'Minor board alignment issue on north wall — corrected.', safetyIssues: 'None.', materialShortages: 'None.', subcontractorIssues: 'None.', decisionsNeeded: 'Client to confirm tile pattern for bathroom floor.' },
    wpProgress: [
      { wp: 'Stud Framing', planned: 100, actual: 100, note: '', delayReason: '' },
      { wp: 'Gypsum Board Installation', planned: 90, actual: 85, note: 'North wall rework', delayReason: 'Alignment correction' },
      { wp: 'Taping / Jointing', planned: 60, actual: 55, note: 'Following boarding', delayReason: '' },
      { wp: 'Tile Laying', planned: 20, actual: 15, note: 'Bathroom started', delayReason: '' },
      { wp: 'Cable Pulling', planned: 80, actual: 80, note: 'Complete', delayReason: '' },
      { wp: 'Painting First Coat', planned: 0, actual: 0, note: 'Not started yet', delayReason: '' },
    ],
    blockers: [],
    photos: [
      { id: 'ph1', caption: 'North wall drywall complete', category: 'Progress', area: 'Living Room' },
      { id: 'ph2', caption: 'Bathroom tile layout started', category: 'Progress', area: 'Bathroom' },
      { id: 'ph3', caption: 'Electrical rough-in behind drywall', category: 'Progress', area: 'Living Room' },
      { id: 'ph4', caption: 'Board alignment issue (corrected)', category: 'Quality', area: 'Living Room' },
    ],
    nextWeek: { planned: 'Complete taping, start primer. Continue bathroom tile.', materialsNeeded: 'Joint compound (4 bags), Primer (2 cans)', laborNeed: '3 drywall crew + 1 tiler', risks: 'Tile pattern confirmation pending from client.' },
    photoCount: 4
  },
  { id: 'WR-2502', week: 'W09 2025', projectId: 'p2', nodeId: 'n8', submittedBy: 'u5', submittedDate: '2025-03-07', progress: 48, prevProgress: 38, completeness: 'Submitted', summary: 'Framing complete. Electrical rough-in 70%.',
    sections: { completed: 'All stud framing. Conduit 80%.', inProgress: 'Electrical cable pulling. Plumbing rough-in.', blocked: 'Electrical panel delivery delayed.', qualityIssues: 'None.', safetyIssues: 'None.', materialShortages: 'Electrical panel not received yet.', subcontractorIssues: 'ElectriQ behind schedule by 2 days.', decisionsNeeded: 'Expedite panel delivery or reschedule.' },
    wpProgress: [
      { wp: 'Stud Framing', planned: 100, actual: 100, note: 'Complete', delayReason: '' },
      { wp: 'Cable Pulling', planned: 80, actual: 70, note: 'Panel delay', delayReason: 'Delivery delayed 3 days' },
      { wp: 'Conduit Installation', planned: 85, actual: 80, note: '', delayReason: '' },
      { wp: 'Plumbing Rough-In', planned: 50, actual: 45, note: '', delayReason: '' },
      { wp: 'Gypsum Board Installation', planned: 0, actual: 0, note: 'Waiting for MEP', delayReason: '' },
    ],
    blockers: [
      { id: 'BLK-001', type: 'Material Delay', severity: 'High', owner: 'u6', dueDate: '2025-03-12', status: 'Open', area: 'Apartment 202', description: 'Electrical panel not delivered — blocks cable termination', linkedRequest: 'MR-24102' },
    ],
    photos: [
      { id: 'ph5', caption: 'Framing complete overview', category: 'Progress', area: 'Full Apartment' },
      { id: 'ph6', caption: 'Conduit runs in bedroom', category: 'Progress', area: 'Bedroom' },
      { id: 'ph7', caption: 'Plumbing stub-outs bathroom', category: 'Progress', area: 'Bathroom' },
    ],
    nextWeek: { planned: 'Complete electrical rough-in (if panel arrives). Continue plumbing.', materialsNeeded: 'Electrical panel, PVC conduit (30m)', laborNeed: '2 electricians + 1 plumber', risks: 'Panel delivery critical path. If not received by Mar 12, drywall start delayed.' },
    photoCount: 3, blockerFlag: true
  },
  { id: 'WR-2503', week: 'W09 2025', projectId: 'p2', nodeId: 'n14', submittedBy: 'u5', submittedDate: '2025-03-07', progress: 72, prevProgress: 62, completeness: 'Submitted', summary: 'Floor tiling 60% complete. Wall paint primer applied.',
    sections: { completed: 'Wall primer all surfaces. Floor tile 60%.', inProgress: 'Floor tiling continuation. Ceiling grid framing.', blocked: 'None.', qualityIssues: 'None.', safetyIssues: 'Wet tile area — warning signs placed.', materialShortages: 'None.', subcontractorIssues: 'None.', decisionsNeeded: 'None.' },
    wpProgress: [
      { wp: 'Tile Laying', planned: 70, actual: 60, note: 'Floor only', delayReason: 'Slightly behind — crew size' },
      { wp: 'Painting First Coat', planned: 100, actual: 100, note: 'Primer done', delayReason: '' },
      { wp: 'Ceiling Grid Installation', planned: 40, actual: 35, note: 'Started', delayReason: '' },
    ],
    blockers: [],
    photos: [
      { id: 'ph8', caption: 'Lobby floor tile in progress', category: 'Progress', area: 'Lobby Main' },
      { id: 'ph9', caption: 'Wall primer complete', category: 'Progress', area: 'Lobby Main' },
      { id: 'ph10', caption: 'Ceiling grid framing started', category: 'Progress', area: 'Lobby Main' },
      { id: 'ph11', caption: 'Before: raw floor', category: 'Progress', area: 'Lobby Main' },
      { id: 'ph12', caption: 'After: tile laid zone A', category: 'Progress', area: 'Lobby Main' },
      { id: 'ph13', caption: 'Safety signs for wet area', category: 'Safety', area: 'Lobby Main' },
    ],
    nextWeek: { planned: 'Complete floor tile. Continue ceiling grid. Start wall paint.', materialsNeeded: 'Tile adhesive (8 bags), LED panels (6)', laborNeed: '2 tilers + 1 ceiling crew', risks: 'None identified.' },
    photoCount: 6
  },
  { id: 'WR-2504', week: 'W09 2025', projectId: 'p1', nodeId: 'an3', submittedBy: 'u5', submittedDate: '2025-03-07', progress: 82, prevProgress: 74, completeness: 'Reviewed', summary: 'Reception desk installed. Lighting nearly complete.',
    sections: { completed: 'Desk installation. Ceiling LED 90%.', inProgress: 'Final LED panel mounting. Paint touch-ups.', blocked: 'None.', qualityIssues: 'None.', safetyIssues: 'None.', materialShortages: 'None.', subcontractorIssues: 'None.', decisionsNeeded: 'Signage design approval from client.' },
    wpProgress: [
      { wp: 'Ceiling Grid Installation', planned: 95, actual: 90, note: 'Almost done', delayReason: '' },
      { wp: 'Painting Final Coat', planned: 80, actual: 80, note: '', delayReason: '' },
      { wp: 'Door Installation', planned: 100, actual: 100, note: 'Complete', delayReason: '' },
    ],
    blockers: [],
    photos: [
      { id: 'ph14', caption: 'Reception desk installed', category: 'Progress', area: 'Reception' },
      { id: 'ph15', caption: 'Ceiling LEDs mounted', category: 'Progress', area: 'Reception' },
      { id: 'ph16', caption: 'Paint touch-up in progress', category: 'Progress', area: 'Reception' },
      { id: 'ph17', caption: 'Before: empty reception', category: 'Progress', area: 'Reception' },
      { id: 'ph18', caption: 'After: desk + lighting', category: 'Progress', area: 'Reception' },
    ],
    nextWeek: { planned: 'Complete LEDs. Signage if approved. Final cleaning.', materialsNeeded: 'None', laborNeed: '1 electrician + cleaning crew', risks: 'Signage approval pending.' },
    photoCount: 5
  },
  { id: 'WR-2505', week: 'W08 2025', projectId: 'p2', nodeId: 'n7', submittedBy: 'u5', submittedDate: '2025-02-28', progress: 45, prevProgress: 35, completeness: 'Reviewed', summary: 'Framing complete. MEP rough-in done. Insulation installed.',
    sections: { completed: 'Framing, MEP rough-in, insulation.', inProgress: 'Preparing for drywall.', blocked: 'None.', qualityIssues: 'None.', safetyIssues: 'None.', materialShortages: 'None.', subcontractorIssues: 'None.', decisionsNeeded: 'None.' },
    wpProgress: [
      { wp: 'Stud Framing', planned: 100, actual: 100, note: '', delayReason: '' },
      { wp: 'Cable Pulling', planned: 75, actual: 75, note: '', delayReason: '' },
      { wp: 'Plumbing Rough-In', planned: 100, actual: 100, note: '', delayReason: '' },
    ],
    blockers: [],
    photos: [
      { id: 'ph19', caption: 'Framing overview', category: 'Progress', area: 'Full Apartment' },
      { id: 'ph20', caption: 'Insulation installed', category: 'Progress', area: 'Bedroom' },
      { id: 'ph21', caption: 'MEP rough-in', category: 'Progress', area: 'Kitchen' },
    ],
    nextWeek: { planned: 'Start drywall boarding.', materialsNeeded: 'Gypsum boards (24), screws (3 boxes)', laborNeed: '3 drywall crew', risks: 'None.' },
    photoCount: 3
  },
  { id: 'WR-2506', week: 'W08 2025', projectId: 'p2', nodeId: 'n9', submittedBy: 'u5', submittedDate: '2025-02-28', progress: 38, prevProgress: 30, completeness: 'Submitted', summary: 'Framing 90%. Waiting for moisture board delivery.',
    sections: { completed: 'Framing 90%. Conduit runs.', inProgress: 'Framing completion.', blocked: 'Moisture resistant board not delivered.', qualityIssues: 'None.', safetyIssues: 'None.', materialShortages: 'Moisture Resistant Board 12.5mm — 0 in stock.', subcontractorIssues: 'None.', decisionsNeeded: 'Expedite board delivery or substitute.' },
    wpProgress: [
      { wp: 'Stud Framing', planned: 100, actual: 90, note: 'Bathroom area pending board', delayReason: 'Moisture board delay' },
      { wp: 'Conduit Installation', planned: 70, actual: 65, note: '', delayReason: '' },
    ],
    blockers: [
      { id: 'BLK-002', type: 'Material Shortage', severity: 'Medium', owner: 'u6', dueDate: '2025-03-05', status: 'Open', area: 'Apartment 203', description: 'Moisture resistant board out of stock — blocks bathroom framing completion', linkedRequest: 'MR-24103' },
    ],
    photos: [
      { id: 'ph22', caption: 'Framing progress', category: 'Progress', area: 'Living Room' },
      { id: 'ph23', caption: 'Bathroom area — waiting for board', category: 'Issue', area: 'Bathroom' },
    ],
    nextWeek: { planned: 'Complete framing if board arrives. Start MEP.', materialsNeeded: 'Moisture board (15 sheets)', laborNeed: '2 framers + 1 electrician', risks: 'Board delivery is critical path for this apartment.' },
    photoCount: 2, blockerFlag: true
  },
  { id: 'WR-2507', week: 'W09 2025', projectId: 'p3', nodeId: null, submittedBy: 'u5', submittedDate: '2025-03-07', progress: 91, prevProgress: 85, completeness: 'Reviewed', summary: 'Final painting underway. Equipment installation 95%.',
    sections: { completed: 'Equipment install 95%. Main painting done.', inProgress: 'Touch-up painting zone B. Final equipment.', blocked: 'None.', qualityIssues: 'Paint color mismatch zone B — recoating.', safetyIssues: 'None.', materialShortages: 'None.', subcontractorIssues: 'None.', decisionsNeeded: 'None.' },
    wpProgress: [
      { wp: 'Painting Final Coat', planned: 95, actual: 90, note: 'Zone B recoat needed', delayReason: 'Color mismatch' },
    ],
    blockers: [],
    photos: [
      { id: 'ph24', caption: 'Food court zone A complete', category: 'Progress', area: 'Zone A' },
      { id: 'ph25', caption: 'Equipment installation', category: 'Progress', area: 'Zone B' },
      { id: 'ph26', caption: 'Paint mismatch zone B', category: 'Quality', area: 'Zone B' },
      { id: 'ph27', caption: 'Recoating in progress', category: 'Progress', area: 'Zone B' },
      { id: 'ph28', caption: 'Zone A — before', category: 'Progress', area: 'Zone A' },
      { id: 'ph29', caption: 'Zone A — after', category: 'Progress', area: 'Zone A' },
      { id: 'ph30', caption: 'Ventilation install', category: 'Progress', area: 'Kitchen Area' },
      { id: 'ph31', caption: 'Final cleaning zone A', category: 'Progress', area: 'Zone A' },
    ],
    nextWeek: { planned: 'Complete recoating. Punch list. Final cleaning.', materialsNeeded: 'Paint (2 buckets zone B color)', laborNeed: '2 painters + cleaning crew', risks: 'Paint availability for specific color.' },
    photoCount: 8
  },
  { id: 'WR-2508', week: 'W09 2025', projectId: 'p1', nodeId: 'an4', submittedBy: 'u5', submittedDate: '2025-03-07', progress: 75, prevProgress: 68, completeness: 'Submitted', summary: 'Ceiling grid installed. Awaiting LED panel replacements.',
    sections: { completed: 'Ceiling grid complete. Cable pulling done.', inProgress: 'LED panel mounting (8 of 12 done). Flooring prep.', blocked: '2 damaged LED panels awaiting replacement.', qualityIssues: 'Damaged panels from delivery DL-24041.', safetyIssues: 'None.', materialShortages: '4 LED panels short (2 damaged + 2 reserve).', subcontractorIssues: 'None.', decisionsNeeded: 'None — replacement panels ordered.' },
    wpProgress: [
      { wp: 'Ceiling Grid Installation', planned: 100, actual: 100, note: 'Grid done, LED partial', delayReason: '' },
      { wp: 'Cable Pulling', planned: 100, actual: 100, note: 'Complete', delayReason: '' },
      { wp: 'Flooring Installation', planned: 20, actual: 10, note: 'Prep stage', delayReason: '' },
    ],
    blockers: [
      { id: 'BLK-003', type: 'Delivery Damage', severity: 'Medium', owner: 'u6', dueDate: '2025-03-14', status: 'Open', area: 'Open Office East', description: '2 LED panels cracked in delivery DL-24041. Replacement ordered — ETA Mar 14.', linkedRequest: 'APR-004' },
    ],
    photos: [
      { id: 'ph32', caption: 'Ceiling grid complete', category: 'Progress', area: 'Open Office East' },
      { id: 'ph33', caption: 'LED panels installed (8/12)', category: 'Progress', area: 'Open Office East' },
      { id: 'ph34', caption: 'Damaged LED panel', category: 'Issue', area: 'Open Office East' },
      { id: 'ph35', caption: 'Flooring subfloor prep', category: 'Progress', area: 'Open Office East' },
    ],
    nextWeek: { planned: 'Install replacement LEDs when received. Continue flooring.', materialsNeeded: '4 LED panels (replacement), laminate flooring (45 sqm)', laborNeed: '1 electrician + 2 flooring crew', risks: 'LED delivery timing — if delayed, ceiling completion slips.' },
    photoCount: 4, blockerFlag: true
  },
];

const allBlockers = weeklyReports.flatMap(wr => (wr.blockers||[]).map(b => ({...b, reportId: wr.id, projectId: wr.projectId, nodeId: wr.nodeId, week: wr.week})));

const activityCatalog = [
  { id: 'act1', name: 'Stud Framing', unit: 'lm', budgetRate: 2800, budgetProductivity: 0.35 },
  { id: 'act2', name: 'Gypsum Board Installation', unit: 'sqm', budgetRate: 3500, budgetProductivity: 0.45 },
  { id: 'act3', name: 'Taping / Jointing', unit: 'sqm', budgetRate: 2800, budgetProductivity: 0.20 },
  { id: 'act4', name: 'Painting First Coat', unit: 'sqm', budgetRate: 3000, budgetProductivity: 0.15 },
  { id: 'act5', name: 'Painting Final Coat', unit: 'sqm', budgetRate: 3000, budgetProductivity: 0.12 },
  { id: 'act6', name: 'Tile Laying', unit: 'sqm', budgetRate: 4000, budgetProductivity: 0.55 },
  { id: 'act7', name: 'Cable Pulling', unit: 'point', budgetRate: 4500, budgetProductivity: 0.40 },
  { id: 'act8', name: 'Conduit Installation', unit: 'meter', budgetRate: 3800, budgetProductivity: 0.25 },
  { id: 'act9', name: 'Ceiling Grid Installation', unit: 'sqm', budgetRate: 3500, budgetProductivity: 0.35 },
  { id: 'act10', name: 'Flooring Installation', unit: 'sqm', budgetRate: 3200, budgetProductivity: 0.30 },
  { id: 'act11', name: 'Door Installation', unit: 'pcs', budgetRate: 3500, budgetProductivity: 1.50 },
  { id: 'act12', name: 'Glass Partition Install', unit: 'module', budgetRate: 4200, budgetProductivity: 1.20 },
  { id: 'act13', name: 'Plumbing Rough-In', unit: 'point', budgetRate: 4000, budgetProductivity: 0.80 },
  { id: 'act14', name: 'Skirting / Trim', unit: 'lm', budgetRate: 2500, budgetProductivity: 0.10 },
];

const approvals = [
  { id: 'APR-001', type: 'Estimate Approval', projectId: 'p4', nodeId: null, requestedBy: 'u4', amount: 46500000, submitted: '2025-02-20', priority: 'High', status: 'Pending', description: 'Ararat Bank EST v2.0 – Final scope with premium finishes' },
  { id: 'APR-002', type: 'Purchase Approval', projectId: 'p2', nodeId: 'n9', requestedBy: 'u5', amount: 1850000, submitted: '2025-03-05', priority: 'Urgent', status: 'Pending', description: 'Purchase tile and adhesive for Apt 203' },
  { id: 'APR-003', type: 'Change Order', projectId: 'p2', nodeId: 'n9', requestedBy: 'u3', amount: 4200000, submitted: '2025-03-01', priority: 'High', status: 'Pending', description: 'CO-001: Additional bathroom tiling scope for Apartment 203' },
  { id: 'APR-004', type: 'Material Exception', projectId: 'p1', nodeId: 'an4', requestedBy: 'u5', amount: 37000, submitted: '2025-03-04', priority: 'Normal', status: 'Approved', description: 'Accept DL-24041 with 2 damaged LED panels' },
  { id: 'APR-005', type: 'Estimate Approval', projectId: 'p2', nodeId: null, requestedBy: 'u4', amount: 219200000, submitted: '2025-03-01', priority: 'Normal', status: 'Pending', description: 'Riverside EST v1.1 – Baseline with CO-001' },
  { id: 'APR-006', type: 'Purchase Approval', projectId: 'p1', nodeId: 'an4', requestedBy: 'u6', amount: 555000, submitted: '2025-03-06', priority: 'Normal', status: 'Approved', description: 'Purchase 4 LED panels + 3 switch sets' },
  { id: 'APR-007', type: 'Change Order', projectId: 'p3', nodeId: null, requestedBy: 'u3', amount: -2400000, submitted: '2025-02-25', priority: 'Normal', status: 'Approved', description: 'CO-003: Scope reduction – removed Zone C signage' },
  { id: 'APR-008', type: 'Purchase Approval', projectId: 'p2', nodeId: 'n14', requestedBy: 'u5', amount: 960000, submitted: '2025-03-08', priority: 'Normal', status: 'Pending', description: 'Purchase ceramic tile for Lobby – specific pattern' },
];

const laborEntries = (() => {
  const e = [];
  const acts = [
    { name:'Gypsum Board Installation', unit:'sqm', rate:3500, budgetProd:0.45 },
    { name:'Tile Laying', unit:'sqm', rate:4000, budgetProd:0.55 },
    { name:'Painting First Coat', unit:'sqm', rate:3000, budgetProd:0.15 },
    { name:'Cable Pulling', unit:'point', rate:4500, budgetProd:0.40 },
    { name:'Plumbing Rough-In', unit:'point', rate:4000, budgetProd:0.80 },
    { name:'Flooring Installation', unit:'sqm', rate:3200, budgetProd:0.30 },
    { name:'Ceiling Grid Installation', unit:'sqm', rate:3500, budgetProd:0.35 },
    { name:'Stud Framing', unit:'lm', rate:2800, budgetProd:0.35 },
    { name:'Door Installation', unit:'pcs', rate:3500, budgetProd:1.50 },
    { name:'Glass Partition Install', unit:'module', rate:4200, budgetProd:1.20 },
  ];
  const workers = [
    { name:'Armen K.', type:'Employee', crew: null },
    { name:'Hakob S.', type:'Employee', crew: null },
    { name:'Mher V.', type:'Employee', crew: null },
    { name:'Sargis T.', type:'Employee', crew: null },
    { name:'Vahan A.', type:'Employee', crew: null },
    { name:'ElectriQ Crew A', type:'Subcontractor', crew: 'ElectriQ LLC', crewSize: 3 },
    { name:'PipeWorks Crew', type:'Subcontractor', crew: 'PipeWorks CJSC', crewSize: 2 },
    { name:'GlassLine Team', type:'Subcontractor', crew: 'GlassLine Studio', crewSize: 2 },
  ];
  const dates = ['2025-03-03','2025-03-04','2025-03-05','2025-03-06','2025-03-07','2025-03-08'];
  const nodes = ['n7','n8','n9','n10','n3','n4','n14','n15','n16','an3','an4','an5'];
  const statuses = ['Approved','Approved','Submitted','Submitted','Reviewed','Approved','Draft','Submitted','Approved','Approved'];
  const attendance = ['Present','Present','Present','Present','Late','Present','Absent','Present'];
  for(let i=0;i<35;i++){
    const act = acts[i % acts.length];
    const w = workers[i % workers.length];
    const hours = 6 + Math.floor(Math.random() * 4);
    const outputQty = Math.max(2, Math.round((hours / act.budgetProd) * (0.7 + Math.random() * 0.5)));
    const actualProd = hours / Math.max(outputQty, 1);
    const costAmount = hours * act.rate;
    e.push({
      id: `LE-${1000+i}`,
      date: dates[i%6],
      projectId: i<22?'p2':'p1',
      nodeId: nodes[i%12],
      worker: w.name,
      workerType: w.type,
      crew: w.crew,
      crewSize: w.crewSize || 1,
      activity: act.name,
      hours,
      outputQty,
      outputUnit: act.unit,
      hourlyRate: act.rate,
      costAmount,
      budgetProductivity: act.budgetProd,
      actualProductivity: Math.round(actualProd * 100) / 100,
      productivityStatus: actualProd <= act.budgetProd * 1.1 ? 'On Target' : actualProd <= act.budgetProd * 1.3 ? 'Below Target' : 'Critical',
      submittedBy: 'u5',
      approvalStatus: statuses[i % statuses.length],
      attendance: attendance[i % attendance.length],
      anomalies: actualProd > act.budgetProd * 1.4 ? ['Output too low for hours'] : hours > 9 ? ['Hours exceed expected'] : [],
    });
  }
  return e;
})();

const notifications = [
  { id: 'n1', message: 'Material request MR-24108 submitted for Apartment 203', time: '14:30', read: false },
  { id: 'n2', message: 'Delivery DL-24044 expected today at Technical Room', time: '08:00', read: false },
  { id: 'n3', message: 'Estimate EST-24029-v2.0 is awaiting approval', time: 'Yesterday', read: false },
  { id: 'n4', message: 'Weekly report missing for Riverside – Corridor F2', time: 'Yesterday', read: false },
  { id: 'n5', message: 'Budget variance exceeded 10% for Open Office East', time: 'Mar 8', read: true },
];

const warehouseStock = [
  { materialId: 'm1', onHand: 80, reserved: 24, available: 56, lastMovement: '2025-03-07' },
  { materialId: 'm2', onHand: 35, reserved: 6, available: 29, lastMovement: '2025-03-03' },
  { materialId: 'm3', onHand: 120, reserved: 35, available: 85, lastMovement: '2025-03-07' },
  { materialId: 'm4', onHand: 95, reserved: 30, available: 65, lastMovement: '2025-03-07' },
  { materialId: 'm5', onHand: 18, reserved: 3, available: 15, lastMovement: '2025-03-07' },
  { materialId: 'm7', onHand: 22, reserved: 4, available: 18, lastMovement: '2025-03-07' },
  { materialId: 'm8', onHand: 12, reserved: 0, available: 12, lastMovement: '2025-02-20', lowStock: true },
  { materialId: 'm9', onHand: 15, reserved: 5, available: 10, lastMovement: '2025-03-07', lowStock: true },
  { materialId: 'm10', onHand: 18, reserved: 10, available: 8, lastMovement: '2025-03-07', lowStock: true },
  { materialId: 'm11', onHand: 110, reserved: 53, available: 57, lastMovement: '2025-03-05' },
  { materialId: 'm12', onHand: 45, reserved: 18, available: 27, lastMovement: '2025-03-05' },
  { materialId: 'm14', onHand: 20, reserved: 8, available: 12, lastMovement: '2025-03-04' },
  { materialId: 'm15', onHand: 500, reserved: 150, available: 350, lastMovement: '2025-03-04' },
  { materialId: 'm17', onHand: 15, reserved: 5, available: 10, lastMovement: '2025-03-02', lowStock: true },
  { materialId: 'm18', onHand: 8, reserved: 0, available: 8, lastMovement: '2025-02-15', lowStock: true },
  { materialId: 'm20', onHand: 95, reserved: 45, available: 50, lastMovement: '2025-03-06' },
  { materialId: 'm22', onHand: 14, reserved: 5, available: 9, lastMovement: '2025-03-03' },
];

const projectStock = [
  { materialId:'m1', projectId:'p2', nodeId:'n7', qty:12, status:'available', note:'Surplus from drywall phase' },
  { materialId:'m3', projectId:'p2', nodeId:'n7', qty:8, status:'available', note:'' },
  { materialId:'m11', projectId:'p2', nodeId:'n3', qty:6, status:'available', note:'Leftover from tiling' },
  { materialId:'m12', projectId:'p2', nodeId:'n3', qty:3, status:'available', note:'Leftover' },
  { materialId:'m12', projectId:'p2', nodeId:'n9', qty:0, status:'consumed', note:'All used' },
  { materialId:'m1', projectId:'p2', nodeId:'n8', qty:5, status:'available', note:'' },
  { materialId:'m15', projectId:'p1', nodeId:'an4', qty:45, status:'available', note:'Partially installed' },
  { materialId:'m14', projectId:'p1', nodeId:'an4', qty:2, status:'damaged', note:'Cracked from DL-24041' },
  { materialId:'m20', projectId:'p1', nodeId:'an5', qty:18, status:'reserved', note:'Reserved for flooring phase' },
  { materialId:'m10', projectId:'p2', nodeId:'n14', qty:4, status:'available', note:'Primer applied, paint remaining' },
  { materialId:'m11', projectId:'p2', nodeId:'n14', qty:14, status:'available', note:'Partially laid' },
  { materialId:'m9', projectId:'p2', nodeId:'n10', qty:2, status:'available', note:'' },
  { materialId:'m5', projectId:'p2', nodeId:'n7', qty:1, status:'available', note:'Partial box' },
  { materialId:'m7', projectId:'p2', nodeId:'n8', qty:3, status:'available', note:'' },
  { materialId:'m16', projectId:'p1', nodeId:'an4', qty:30, status:'available', note:'' },
];

const areaTransfers = [
  { id:'TRF-001', date:'2025-03-05', projectId:'p2', fromNode:'n3', toNode:'n14', material:'Ceramic Tile 600x600 Grey', qty:8, unit:'sqm', reason:'Surplus in Apt 101, needed in Lobby', approvedBy:'u3', status:'Completed' },
  { id:'TRF-002', date:'2025-03-06', projectId:'p2', fromNode:'n7', toNode:'n9', material:'Gypsum Board 12.5mm', qty:6, unit:'sheet', reason:'Excess board in Apt 201, Apt 203 short', approvedBy:'u5', status:'Completed' },
  { id:'TRF-003', date:'2025-03-08', projectId:'p1', fromNode:'an4', toNode:'an5', material:'PVC Conduit 20mm', qty:15, unit:'meter', reason:'Excess in Open Office East', approvedBy:'u5', status:'Completed' },
  { id:'TRF-004', date:'2025-03-09', projectId:'p2', fromNode:'n7', toNode:'n10', material:'Joint Compound 20kg', qty:2, unit:'bag', reason:'Corridor needs compound for patching', approvedBy:'u5', status:'Pending' },
];

// ============================================================
// INVENTORY LOCATIONS
// ============================================================
const inventoryLocations = [
  { id: 'loc-wh',     code: 'WH-CENTRAL',  name: 'Central Warehouse',         type: 'warehouse',    projectId: null, areaId: null,  isActive: true },
  { id: 'loc-p2-n3',  code: 'RIV-APT101',  name: 'Riverside / Apt 101',       type: 'project_area', projectId: 'p2', areaId: 'n3',  isActive: true },
  { id: 'loc-p2-n7',  code: 'RIV-APT201',  name: 'Riverside / Apt 201',       type: 'project_area', projectId: 'p2', areaId: 'n7',  isActive: true },
  { id: 'loc-p2-n8',  code: 'RIV-APT202',  name: 'Riverside / Apt 202',       type: 'project_area', projectId: 'p2', areaId: 'n8',  isActive: true },
  { id: 'loc-p2-n9',  code: 'RIV-APT203',  name: 'Riverside / Apt 203',       type: 'project_area', projectId: 'p2', areaId: 'n9',  isActive: true },
  { id: 'loc-p2-n10', code: 'RIV-COR-F2',  name: 'Riverside / Corridor F2',   type: 'project_area', projectId: 'p2', areaId: 'n10', isActive: true },
  { id: 'loc-p2-n14', code: 'RIV-LOB',     name: 'Riverside / Lobby',         type: 'project_area', projectId: 'p2', areaId: 'n14', isActive: true },
  { id: 'loc-p1-an4', code: 'AMR-OE',      name: 'Ameria / Open Office East', type: 'project_area', projectId: 'p1', areaId: 'an4', isActive: true },
  { id: 'loc-p1-an5', code: 'AMR-OW',      name: 'Ameria / Open Office West', type: 'project_area', projectId: 'p1', areaId: 'an5', isActive: true },
  { id: 'loc-p1-an3', code: 'AMR-REC',     name: 'Ameria / Reception',        type: 'project_area', projectId: 'p1', areaId: 'an3', isActive: true },
];

// ============================================================
// SEED DATA: Transfer Orders
// ============================================================
const seedTransferOrders = [
  {
    id: 'to-001', transferNo: 'TRF-2025-001',
    sourceLocationId: 'loc-wh', destinationLocationId: 'loc-p2-n7',
    transferType: 'warehouse_to_area', status: 'Received',
    requestedByUserId: 'u5', approvedByUserId: 'u7', pickedByUserId: 'u6', receivedByUserId: 'u5',
    sentAt: '2025-03-07T10:00:00', receivedAt: '2025-03-07T14:30:00',
    reason: 'Drywall phase materials for Apt 201', projectId: 'p2', notes: 'Urgent — framing crew waiting',
    createdAt: '2025-03-06T09:00:00', updatedAt: '2025-03-07T14:30:00',
    lines: [
      { id:'tl-001a', materialId:'m1',  requestedQty:24, approvedQty:24, pickedQty:24, shippedQty:24, receivedQty:24, uom:'sheet', conditionNote:'Good', discrepancyNote:'' },
      { id:'tl-001b', materialId:'m3',  requestedQty:35, approvedQty:35, pickedQty:35, shippedQty:35, receivedQty:35, uom:'lm',    conditionNote:'Good', discrepancyNote:'' },
      { id:'tl-001c', materialId:'m4',  requestedQty:30, approvedQty:30, pickedQty:30, shippedQty:30, receivedQty:30, uom:'lm',    conditionNote:'Good', discrepancyNote:'' },
    ]
  },
  {
    id: 'to-002', transferNo: 'TRF-2025-002',
    sourceLocationId: 'loc-wh', destinationLocationId: 'loc-p2-n8',
    transferType: 'warehouse_to_area', status: 'In Transit',
    requestedByUserId: 'u5', approvedByUserId: 'u7', pickedByUserId: 'u6', receivedByUserId: null,
    sentAt: '2025-03-09T11:00:00', receivedAt: null,
    reason: 'Tile package for Apt 202 bathroom', projectId: 'p2', notes: '',
    createdAt: '2025-03-08T08:00:00', updatedAt: '2025-03-09T11:00:00',
    lines: [
      { id:'tl-002a', materialId:'m11', requestedQty:18, approvedQty:18, pickedQty:18, shippedQty:18, receivedQty:0, uom:'sqm', conditionNote:'', discrepancyNote:'' },
      { id:'tl-002b', materialId:'m12', requestedQty:6,  approvedQty:6,  pickedQty:6,  shippedQty:6,  receivedQty:0, uom:'bag', conditionNote:'', discrepancyNote:'' },
    ]
  },
  {
    id: 'to-003', transferNo: 'TRF-2025-003',
    sourceLocationId: 'loc-wh', destinationLocationId: 'loc-p2-n10',
    transferType: 'warehouse_to_area', status: 'Approved',
    requestedByUserId: 'u5', approvedByUserId: 'u7', pickedByUserId: null, receivedByUserId: null,
    sentAt: null, receivedAt: null,
    reason: 'Paint package for Corridor F2', projectId: 'p2', notes: 'Coordinate with painting crew',
    createdAt: '2025-03-07T14:00:00', updatedAt: '2025-03-08T09:00:00',
    lines: [
      { id:'tl-003a', materialId:'m9',  requestedQty:4, approvedQty:4, pickedQty:0, shippedQty:0, receivedQty:0, uom:'can',    conditionNote:'', discrepancyNote:'' },
      { id:'tl-003b', materialId:'m10', requestedQty:6, approvedQty:6, pickedQty:0, shippedQty:0, receivedQty:0, uom:'bucket', conditionNote:'', discrepancyNote:'' },
    ]
  },
  {
    id: 'to-004', transferNo: 'TRF-2025-004',
    sourceLocationId: 'loc-p2-n3', destinationLocationId: 'loc-p2-n14',
    transferType: 'area_to_area', status: 'Submitted',
    requestedByUserId: 'u5', approvedByUserId: null, pickedByUserId: null, receivedByUserId: null,
    sentAt: null, receivedAt: null,
    reason: 'Surplus tile from Apt 101 needed in Lobby', projectId: 'p2', notes: '',
    createdAt: '2025-03-09T10:00:00', updatedAt: '2025-03-09T10:00:00',
    lines: [
      { id:'tl-004a', materialId:'m11', requestedQty:8, approvedQty:0, pickedQty:0, shippedQty:0, receivedQty:0, uom:'sqm', conditionNote:'', discrepancyNote:'' },
      { id:'tl-004b', materialId:'m12', requestedQty:3, approvedQty:0, pickedQty:0, shippedQty:0, receivedQty:0, uom:'bag', conditionNote:'', discrepancyNote:'' },
    ]
  },
  {
    id: 'to-005', transferNo: 'TRF-2025-005',
    sourceLocationId: 'loc-wh', destinationLocationId: 'loc-p2-n9',
    transferType: 'warehouse_to_area', status: 'Draft',
    requestedByUserId: 'u5', approvedByUserId: null, pickedByUserId: null, receivedByUserId: null,
    sentAt: null, receivedAt: null,
    reason: 'Drywall materials for Apt 203 phase 2', projectId: 'p2', notes: 'Pending scope confirmation',
    createdAt: '2025-03-09T16:00:00', updatedAt: '2025-03-09T16:00:00',
    lines: [
      { id:'tl-005a', materialId:'m1', requestedQty:30, approvedQty:0, pickedQty:0, shippedQty:0, receivedQty:0, uom:'sheet', conditionNote:'', discrepancyNote:'' },
      { id:'tl-005b', materialId:'m3', requestedQty:40, approvedQty:0, pickedQty:0, shippedQty:0, receivedQty:0, uom:'lm',    conditionNote:'', discrepancyNote:'' },
      { id:'tl-005c', materialId:'m7', requestedQty:5,  approvedQty:0, pickedQty:0, shippedQty:0, receivedQty:0, uom:'bag',   conditionNote:'', discrepancyNote:'' },
    ]
  },
  {
    id: 'to-006', transferNo: 'TRF-2025-006',
    sourceLocationId: 'loc-p1-an4', destinationLocationId: 'loc-p1-an5',
    transferType: 'area_to_area', status: 'Cancelled',
    requestedByUserId: 'u5', approvedByUserId: 'u7', pickedByUserId: null, receivedByUserId: null,
    sentAt: null, receivedAt: null,
    reason: 'PVC conduit from Open Office East to West', projectId: 'p1', notes: 'Cancelled — direct delivery arranged',
    createdAt: '2025-03-08T11:00:00', updatedAt: '2025-03-09T09:00:00',
    lines: [
      { id:'tl-006a', materialId:'m16', requestedQty:15, approvedQty:15, pickedQty:0, shippedQty:0, receivedQty:0, uom:'meter', conditionNote:'', discrepancyNote:'' },
    ]
  },
];

// ============================================================
// SEED DATA: Inventory Movements
// ============================================================
const seedInventoryMovements = [
  { id:'im-001', movementType:'reserve',   materialId:'m1',  qty:24, uom:'sheet', fromLocationId:'loc-wh',     toLocationId:null,         referenceType:'transfer_order', referenceId:'to-001', performedByUserId:'u7', timestamp:'2025-03-06T15:00:00', note:'Reserved for TRF-2025-001' },
  { id:'im-002', movementType:'issue',     materialId:'m1',  qty:24, uom:'sheet', fromLocationId:'loc-wh',     toLocationId:'loc-p2-n7',  referenceType:'transfer_order', referenceId:'to-001', performedByUserId:'u6', timestamp:'2025-03-07T10:00:00', note:'Issued for TRF-2025-001' },
  { id:'im-003', movementType:'receipt',   materialId:'m1',  qty:24, uom:'sheet', fromLocationId:'loc-wh',     toLocationId:'loc-p2-n7',  referenceType:'transfer_order', referenceId:'to-001', performedByUserId:'u5', timestamp:'2025-03-07T14:30:00', note:'Received at Apt 201' },
  { id:'im-004', movementType:'reserve',   materialId:'m11', qty:18, uom:'sqm',   fromLocationId:'loc-wh',     toLocationId:null,         referenceType:'transfer_order', referenceId:'to-002', performedByUserId:'u7', timestamp:'2025-03-08T09:00:00', note:'Reserved for TRF-2025-002' },
  { id:'im-005', movementType:'issue',     materialId:'m11', qty:18, uom:'sqm',   fromLocationId:'loc-wh',     toLocationId:'loc-p2-n8',  referenceType:'transfer_order', referenceId:'to-002', performedByUserId:'u6', timestamp:'2025-03-09T11:00:00', note:'Issued for TRF-2025-002' },
  { id:'im-006', movementType:'reserve',   materialId:'m9',  qty:4,  uom:'can',   fromLocationId:'loc-wh',     toLocationId:null,         referenceType:'transfer_order', referenceId:'to-003', performedByUserId:'u7', timestamp:'2025-03-08T09:00:00', note:'Reserved for TRF-2025-003' },
  { id:'im-007', movementType:'unreserve', materialId:'m16', qty:15, uom:'meter', fromLocationId:'loc-p1-an4', toLocationId:null,         referenceType:'transfer_order', referenceId:'to-006', performedByUserId:'u7', timestamp:'2025-03-09T09:00:00', note:'Cancelled — reservation released' },
];

const movementLog = [
  { id:'MOV-001', date:'2025-03-07', type:'Supplier → Warehouse', material:'Gypsum Board 12.5mm', qty:40, from:'BuildMart LLC', to:'Central Warehouse', ref:'PO-2025-089', status:'Received' },
  { id:'MOV-002', date:'2025-03-07', type:'Warehouse → Project', material:'Gypsum Board 12.5mm', qty:24, from:'Central Warehouse', to:'BRG-24021 / Apt 201', ref:'MR-24101', status:'Delivered' },
  { id:'MOV-003', date:'2025-03-07', type:'Warehouse → Project', material:'Metal Stud 50mm', qty:35, from:'Central Warehouse', to:'BRG-24021 / Apt 201', ref:'MR-24101', status:'Delivered' },
  { id:'MOV-004', date:'2025-03-06', type:'Area → Area', material:'Gypsum Board 12.5mm', qty:6, from:'Apt 201', to:'Apt 203', ref:'TRF-002', status:'Completed' },
  { id:'MOV-005', date:'2025-03-05', type:'Area → Area', material:'Ceramic Tile 600x600 Grey', qty:8, from:'Apt 101', to:'Lobby', ref:'TRF-001', status:'Completed' },
  { id:'MOV-006', date:'2025-03-04', type:'Supplier → Project', material:'LED Panel 600x600', qty:12, from:'ElectroHouse', to:'BRG-24017 / Open Office East', ref:'DL-24041', status:'Received w/ Discrepancy' },
  { id:'MOV-007', date:'2025-03-04', type:'Warehouse → Project', material:'Electrical Cable NYM 3x2.5', qty:200, from:'Central Warehouse', to:'BRG-24017 / Open Office East', ref:'MR-24104', status:'Delivered' },
  { id:'MOV-008', date:'2025-03-03', type:'Supplier → Warehouse', material:'Ceramic Tile 600x600 Grey', qty:60, from:'MegaCeram Armenia', to:'Central Warehouse', ref:'PO-2025-085', status:'Received' },
  { id:'MOV-009', date:'2025-03-02', type:'Consumed', material:'Interior Paint White 15L', qty:3, from:'BRG-24021 / Lobby', to:'—', ref:'WR-2503', status:'Used' },
  { id:'MOV-010', date:'2025-03-01', type:'Damaged', material:'LED Panel 600x600', qty:2, from:'BRG-24017 / Open Office East', to:'Return / Claim', ref:'DL-24041', status:'Write-off' },
  { id:'MOV-011', date:'2025-02-28', type:'Supplier → Warehouse', material:'Tile Adhesive 25kg', qty:30, from:'MegaCeram Armenia', to:'Central Warehouse', ref:'PO-2025-082', status:'Received' },
  { id:'MOV-012', date:'2025-03-08', type:'Warehouse → Project', material:'PVC Conduit 20mm', qty:120, from:'Central Warehouse', to:'BRG-24017 / Open Office East', ref:'MR-24104', status:'Delivered' },
];

const estimateVersions = [
  { id: 'ev1', projectId: 'p4', version: '1.0', revision: 'Initial draft', status: 'Superseded', preparedBy: 'u4', submitted: '2025-02-05', totalCost: 38200000, totalSales: 46500000, margin: 17.8 },
  { id: 'ev2', projectId: 'p4', version: '1.1', revision: 'Revised after client comments', status: 'Superseded', preparedBy: 'u4', submitted: '2025-02-12', totalCost: 36800000, totalSales: 44800000, margin: 17.9 },
  { id: 'ev3', projectId: 'p4', version: '2.0', revision: 'Final scope with premium finishes', status: 'Pending Approval', preparedBy: 'u4', submitted: '2025-02-20', totalCost: 38500000, totalSales: 46500000, margin: 17.2 },
  { id: 'ev4', projectId: 'p2', version: '1.0', revision: 'Approved baseline', status: 'Approved', preparedBy: 'u4', submitted: '2024-04-10', totalCost: 178000000, totalSales: 215000000, margin: 17.2 },
  { id: 'ev5', projectId: 'p2', version: '1.1', revision: 'CO-001 Additional tiling Apt 203', status: 'Pending Approval', preparedBy: 'u4', submitted: '2025-03-01', totalCost: 181500000, totalSales: 219200000, margin: 17.2 },
];

const templates = [
  {
    id: 't1', name: 'Plasterboard Wall Type A', version: '2.1', owner: 'u4', category: 'Drywall',
    inputs: [{ key: 'length_m', label: 'Wall Length (m)', default: 4 }, { key: 'height_m', label: 'Wall Height (m)', default: 2.7 }],
    outputs: [
      { materialId: 'm1', formula: 'area / 3', label: 'Gypsum Board Sheets', unit: 'sheet', waste: 5 },
      { materialId: 'm3', formula: 'length * 2.2', label: 'Metal Stud 50mm', unit: 'lm', waste: 3 },
      { materialId: 'm4', formula: 'length * 2', label: 'Metal Track 50mm', unit: 'lm', waste: 3 },
      { materialId: 'm5', formula: 'area * 22 / 500', label: 'Drywall Screws', unit: 'box', waste: 0 },
      { materialId: 'm6', formula: 'length * 1.1', label: 'Joint Tape', unit: 'roll', waste: 0 },
      { materialId: 'm7', formula: 'area * 0.6 / 20', label: 'Joint Compound', unit: 'bag', waste: 0 },
    ],
    laborFormula: 'area * 0.45', laborLabel: 'Installation Labor', laborRate: 3500,
  },
  {
    id: 't2', name: 'Standard Interior Paint Package', version: '1.3', owner: 'u4', category: 'Paint',
    inputs: [{ key: 'area_sqm', label: 'Surface Area (sqm)', default: 25 }],
    outputs: [
      { materialId: 'm9', formula: 'area / 40', label: 'Primer', unit: 'can', waste: 5 },
      { materialId: 'm10', formula: 'area * 2 / 60', label: 'Interior Paint (2 coats)', unit: 'bucket', waste: 5 },
    ],
    laborFormula: 'area * 0.25', laborLabel: 'Painting Labor', laborRate: 3000,
  },
  {
    id: 't3', name: 'Suspended Ceiling Grid + Tile', version: '1.5', owner: 'u4', category: 'Ceiling',
    inputs: [{ key: 'area_sqm', label: 'Ceiling Area (sqm)', default: 30 }],
    outputs: [
      { materialId: null, formula: 'area * 1.05', label: 'Ceiling Tile 600x600', unit: 'sqm', waste: 5 },
      { materialId: 'm14', formula: 'Math.ceil(area / 3.6)', label: 'LED Panel 600x600', unit: 'pcs', waste: 0 },
    ],
    laborFormula: 'area * 0.35', laborLabel: 'Ceiling Installation', laborRate: 3500,
  },
  {
    id: 't4', name: 'Ceramic Tile Floor Package', version: '2.0', owner: 'u4', category: 'Tile',
    inputs: [{ key: 'area_sqm', label: 'Floor Area (sqm)', default: 15 }],
    outputs: [
      { materialId: 'm11', formula: 'area * 1.1', label: 'Ceramic Tile 600x600', unit: 'sqm', waste: 10 },
      { materialId: 'm12', formula: 'area * 0.2', label: 'Tile Adhesive', unit: 'bag', waste: 0 },
      { materialId: 'm13', formula: 'area * 0.08', label: 'Tile Grout', unit: 'bag', waste: 0 },
    ],
    laborFormula: 'area * 0.55', laborLabel: 'Tile Laying Labor', laborRate: 4000,
  },
  {
    id: 't5', name: 'Bathroom Wall + Floor Tile Package', version: '1.8', owner: 'u4', category: 'Tile',
    inputs: [{ key: 'floor_sqm', label: 'Floor Area (sqm)', default: 6 }, { key: 'wall_sqm', label: 'Wall Area (sqm)', default: 18 }],
    outputs: [
      { materialId: 'm11', formula: 'total * 1.1', label: 'Ceramic Tile', unit: 'sqm', waste: 10 },
      { materialId: 'm12', formula: 'total * 0.22', label: 'Tile Adhesive', unit: 'bag', waste: 0 },
      { materialId: 'm13', formula: 'total * 0.1', label: 'Tile Grout', unit: 'bag', waste: 0 },
      { materialId: 'm2', formula: 'wall / 3', label: 'Moisture Resistant Board', unit: 'sheet', waste: 5 },
      { materialId: 'm22', formula: '2', label: 'Silicone Sealant', unit: 'tube', waste: 0 },
    ],
    laborFormula: 'total * 0.65', laborLabel: 'Bathroom Tile Labor', laborRate: 4000,
  },
  {
    id: 't6', name: 'Office Glass Partition Package', version: '1.1', owner: 'u4', category: 'Partitions',
    inputs: [{ key: 'length_m', label: 'Partition Length (m)', default: 6 }],
    outputs: [
      { materialId: 'm18', formula: 'Math.ceil(length / 1.2)', label: 'Glass Partition Module', unit: 'module', waste: 0 },
      { materialId: 'm19', formula: '1', label: 'Door Leaf MDF White', unit: 'pcs', waste: 0 },
      { materialId: 'm22', formula: 'Math.ceil(length / 3)', label: 'Silicone Sealant', unit: 'tube', waste: 0 },
    ],
    laborFormula: 'length * 1.2', laborLabel: 'Partition Installation', laborRate: 4500,
  },
];

// Enhanced estimate lines with richer data
const estimateLinesFull = [
  { id:'el1', evId:'ev4', nodeId:'n7', n:1, type:'Material', desc:'Gypsum Board 12.5mm', qty:120, unit:'sheet', uc:3200, us:4100, lh:0, waste:5, markup:28, src:'catalog', supplier:'BuildMart LLC', templateId:'t1', changed:false, locked:false, stock:56, procStatus:'In Stock' },
  { id:'el2', evId:'ev4', nodeId:'n7', n:2, type:'Material', desc:'Metal Stud 50mm', qty:85, unit:'lm', uc:850, us:1100, lh:0, waste:3, markup:29, src:'catalog', supplier:'BuildMart LLC', templateId:'t1', changed:false, locked:false, stock:85, procStatus:'In Stock' },
  { id:'el3', evId:'ev4', nodeId:'n7', n:3, type:'Material', desc:'Metal Track 50mm', qty:72, unit:'lm', uc:780, us:1000, lh:0, waste:3, markup:28, src:'catalog', supplier:'BuildMart LLC', templateId:'t1', changed:false, locked:false, stock:65, procStatus:'In Stock' },
  { id:'el4', evId:'ev4', nodeId:'n7', n:4, type:'Material', desc:'Drywall Screws 25mm', qty:14, unit:'box', uc:2400, us:3100, lh:0, waste:0, markup:29, src:'catalog', supplier:'BuildMart LLC', templateId:'t1', changed:false, locked:false, stock:15, procStatus:'In Stock' },
  { id:'el5', evId:'ev4', nodeId:'n7', n:5, type:'Material', desc:'Joint Compound 20kg', qty:18, unit:'bag', uc:4500, us:5800, lh:0, waste:0, markup:29, src:'last_purchase', supplier:'BuildMart LLC', templateId:'t1', changed:false, locked:false, stock:18, procStatus:'In Stock' },
  { id:'el6', evId:'ev4', nodeId:'n7', n:6, type:'Labor', desc:'Drywall Installation', qty:180, unit:'hr', uc:3500, us:5000, lh:180, waste:0, markup:43, src:'norm', supplier:'—', templateId:'t1', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el7', evId:'ev4', nodeId:'n7', n:7, type:'Material', desc:'Mineral Wool 50mm', qty:38, unit:'pack', uc:6800, us:8800, lh:0, waste:5, markup:29, src:'catalog', supplier:'BuildMart LLC', templateId:null, changed:false, locked:false, stock:12, procStatus:'Low Stock' },
  { id:'el8', evId:'ev4', nodeId:'n7', n:8, type:'Material', desc:'Interior Paint White 15L', qty:8, unit:'bucket', uc:12500, us:16000, lh:0, waste:5, markup:28, src:'catalog', supplier:'NorNerk Paints', templateId:'t2', changed:false, locked:false, stock:8, procStatus:'Low Stock' },
  { id:'el9', evId:'ev4', nodeId:'n7', n:9, type:'Labor', desc:'Painting Works', qty:42, unit:'hr', uc:3000, us:4500, lh:42, waste:0, markup:50, src:'norm', supplier:'—', templateId:'t2', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el10', evId:'ev4', nodeId:'n8', n:10, type:'Material', desc:'Gypsum Board 12.5mm', qty:95, unit:'sheet', uc:3200, us:4100, lh:0, waste:5, markup:28, src:'catalog', supplier:'BuildMart LLC', templateId:'t1', changed:false, locked:false, stock:56, procStatus:'In Stock' },
  { id:'el11', evId:'ev4', nodeId:'n8', n:11, type:'Material', desc:'Metal Stud 50mm', qty:68, unit:'lm', uc:850, us:1100, lh:0, waste:3, markup:29, src:'catalog', supplier:'BuildMart LLC', templateId:'t1', changed:false, locked:false, stock:85, procStatus:'In Stock' },
  { id:'el12', evId:'ev4', nodeId:'n8', n:12, type:'Labor', desc:'Drywall Installation', qty:145, unit:'hr', uc:3500, us:5000, lh:145, waste:0, markup:43, src:'norm', supplier:'—', templateId:'t1', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el13', evId:'ev4', nodeId:'n8', n:13, type:'Material', desc:'Ceramic Tile 600x600 Grey', qty:22, unit:'sqm', uc:8500, us:11000, lh:0, waste:10, markup:29, src:'catalog', supplier:'MegaCeram Armenia', templateId:'t4', changed:false, locked:false, stock:57, procStatus:'In Stock' },
  { id:'el14', evId:'ev4', nodeId:'n8', n:14, type:'Material', desc:'Tile Adhesive 25kg', qty:8, unit:'bag', uc:3800, us:4900, lh:0, waste:0, markup:29, src:'last_purchase', supplier:'MegaCeram Armenia', templateId:'t4', changed:false, locked:false, stock:27, procStatus:'In Stock' },
  { id:'el15', evId:'ev4', nodeId:'n8', n:15, type:'Labor', desc:'Tile Laying', qty:35, unit:'hr', uc:4000, us:5800, lh:35, waste:0, markup:45, src:'norm', supplier:'—', templateId:'t4', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el16', evId:'ev4', nodeId:'n9', n:16, type:'Material', desc:'Gypsum Board 12.5mm', qty:110, unit:'sheet', uc:3200, us:4100, lh:0, waste:5, markup:28, src:'catalog', supplier:'BuildMart LLC', templateId:'t1', changed:true, locked:false, stock:56, procStatus:'In Stock' },
  { id:'el17', evId:'ev4', nodeId:'n9', n:17, type:'Material', desc:'Metal Stud 50mm', qty:78, unit:'lm', uc:850, us:1100, lh:0, waste:3, markup:29, src:'catalog', supplier:'BuildMart LLC', templateId:'t1', changed:true, locked:false, stock:85, procStatus:'In Stock' },
  { id:'el18', evId:'ev4', nodeId:'n9', n:18, type:'Labor', desc:'Drywall Installation', qty:165, unit:'hr', uc:3500, us:5000, lh:165, waste:0, markup:43, src:'norm', supplier:'—', templateId:'t1', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el19', evId:'ev4', nodeId:'n9', n:19, type:'Material', desc:'Ceramic Tile 600x600 Grey', qty:42, unit:'sqm', uc:8500, us:11000, lh:0, waste:10, markup:29, src:'catalog', supplier:'MegaCeram Armenia', templateId:'t5', changed:true, locked:false, stock:57, procStatus:'In Stock' },
  { id:'el20', evId:'ev4', nodeId:'n9', n:20, type:'Material', desc:'Tile Adhesive 25kg', qty:14, unit:'bag', uc:3800, us:4900, lh:0, waste:0, markup:29, src:'last_purchase', supplier:'MegaCeram Armenia', templateId:'t5', changed:true, locked:false, stock:27, procStatus:'In Stock' },
  { id:'el21', evId:'ev4', nodeId:'n9', n:21, type:'Material', desc:'Moisture Resistant Board 12.5mm', qty:12, unit:'sheet', uc:4800, us:6200, lh:0, waste:5, markup:29, src:'catalog', supplier:'BuildMart LLC', templateId:'t5', changed:true, locked:false, stock:29, procStatus:'In Stock' },
  { id:'el22', evId:'ev4', nodeId:'n9', n:22, type:'Labor', desc:'Bathroom Tile Labor', qty:52, unit:'hr', uc:4000, us:5800, lh:52, waste:0, markup:45, src:'norm', supplier:'—', templateId:'t5', changed:true, locked:false, stock:null, procStatus:null },
  { id:'el23', evId:'ev4', nodeId:'n10', n:23, type:'Material', desc:'Primer Deep Penetration 10L', qty:4, unit:'can', uc:5200, us:6700, lh:0, waste:5, markup:29, src:'catalog', supplier:'NorNerk Paints', templateId:'t2', changed:false, locked:false, stock:10, procStatus:'In Stock' },
  { id:'el24', evId:'ev4', nodeId:'n10', n:24, type:'Material', desc:'Interior Paint White 15L', qty:6, unit:'bucket', uc:12500, us:16000, lh:0, waste:5, markup:28, src:'catalog', supplier:'NorNerk Paints', templateId:'t2', changed:false, locked:false, stock:8, procStatus:'Low Stock' },
  { id:'el25', evId:'ev4', nodeId:'n10', n:25, type:'Labor', desc:'Painting Works', qty:24, unit:'hr', uc:3000, us:4500, lh:24, waste:0, markup:50, src:'norm', supplier:'—', templateId:'t2', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el26', evId:'ev4', nodeId:'n10', n:26, type:'Material', desc:'Laminate Flooring AC4 Oak', qty:32, unit:'sqm', uc:7200, us:9300, lh:0, waste:8, markup:29, src:'catalog', supplier:'ProfiShin LLC', templateId:null, changed:false, locked:true, stock:50, procStatus:'In Stock' },
  { id:'el27', evId:'ev4', nodeId:'n10', n:27, type:'Material', desc:'Skirting PVC White', qty:40, unit:'lm', uc:650, us:850, lh:0, waste:5, markup:31, src:'catalog', supplier:'ProfiShin LLC', templateId:null, changed:false, locked:true, stock:65, procStatus:'In Stock' },
  { id:'el28', evId:'ev4', nodeId:'n10', n:28, type:'Labor', desc:'Flooring Installation', qty:18, unit:'hr', uc:3200, us:4600, lh:18, waste:0, markup:44, src:'norm', supplier:'—', templateId:null, changed:false, locked:false, stock:null, procStatus:null },
  { id:'el29', evId:'ev4', nodeId:'n14', n:29, type:'Material', desc:'Ceramic Tile 600x600 Grey', qty:35, unit:'sqm', uc:8500, us:11000, lh:0, waste:10, markup:29, src:'supplier_quote', supplier:'MegaCeram Armenia', templateId:'t4', changed:false, locked:false, stock:57, procStatus:'In Stock' },
  { id:'el30', evId:'ev4', nodeId:'n14', n:30, type:'Material', desc:'Tile Adhesive 25kg', qty:12, unit:'bag', uc:3800, us:4900, lh:0, waste:0, markup:29, src:'last_purchase', supplier:'MegaCeram Armenia', templateId:'t4', changed:false, locked:false, stock:27, procStatus:'In Stock' },
  { id:'el31', evId:'ev4', nodeId:'n14', n:31, type:'Labor', desc:'Tile Laying', qty:55, unit:'hr', uc:4000, us:5800, lh:55, waste:0, markup:45, src:'norm', supplier:'—', templateId:'t4', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el32', evId:'ev4', nodeId:'n14', n:32, type:'Material', desc:'LED Panel 600x600', qty:6, unit:'pcs', uc:18500, us:24000, lh:0, waste:0, markup:30, src:'catalog', supplier:'ElectroHouse', templateId:'t3', changed:false, locked:false, stock:12, procStatus:'In Stock' },
  { id:'el33', evId:'ev4', nodeId:'n14', n:33, type:'Subcontract', desc:'Plumbing Rough-In Package', qty:1, unit:'lumpsum', uc:850000, us:1050000, lh:0, waste:0, markup:24, src:'manual', supplier:'SubCo: PipeWorks', templateId:null, changed:false, locked:true, stock:null, procStatus:null },
  { id:'el34', evId:'ev4', nodeId:'n15', n:34, type:'Material', desc:'Ceramic Tile 600x600 Grey', qty:28, unit:'sqm', uc:8500, us:11000, lh:0, waste:10, markup:29, src:'catalog', supplier:'MegaCeram Armenia', templateId:'t4', changed:false, locked:false, stock:57, procStatus:'In Stock' },
  { id:'el35', evId:'ev4', nodeId:'n15', n:35, type:'Labor', desc:'Tile Laying', qty:42, unit:'hr', uc:4000, us:5800, lh:42, waste:0, markup:45, src:'norm', supplier:'—', templateId:'t4', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el36', evId:'ev4', nodeId:'n16', n:36, type:'Material', desc:'Electrical Cable NYM 3x2.5', qty:150, unit:'meter', uc:420, us:550, lh:0, waste:5, markup:31, src:'catalog', supplier:'ElectroHouse', templateId:null, changed:false, locked:false, stock:350, procStatus:'In Stock' },
  { id:'el37', evId:'ev4', nodeId:'n16', n:37, type:'Material', desc:'PVC Conduit 20mm', qty:80, unit:'meter', uc:180, us:240, lh:0, waste:5, markup:33, src:'catalog', supplier:'ElectroHouse', templateId:null, changed:false, locked:false, stock:180, procStatus:'In Stock' },
  { id:'el38', evId:'ev4', nodeId:'n16', n:38, type:'Labor', desc:'Electrical Installation', qty:65, unit:'hr', uc:4500, us:6500, lh:65, waste:0, markup:44, src:'norm', supplier:'—', templateId:null, changed:false, locked:false, stock:null, procStatus:null },
  { id:'el39', evId:'ev4', nodeId:'n16', n:39, type:'Equipment', desc:'Scaffolding Rental', qty:4, unit:'week', uc:45000, us:58000, lh:0, waste:0, markup:29, src:'manual', supplier:'—', templateId:null, changed:false, locked:true, stock:null, procStatus:null },
  { id:'el40', evId:'ev4', nodeId:'n16', n:40, type:'Misc', desc:'Clean-up and Waste Disposal', qty:1, unit:'lumpsum', uc:120000, us:155000, lh:0, waste:0, markup:29, src:'manual', supplier:'—', templateId:null, changed:false, locked:false, stock:null, procStatus:null },
  // Ararat Bank ev3 lines
  { id:'el41', evId:'ev3', nodeId:'ab3', n:1, type:'Material', desc:'Gypsum Board 12.5mm', qty:85, unit:'sheet', uc:3200, us:4100, lh:0, waste:5, markup:28, src:'catalog', supplier:'BuildMart LLC', templateId:'t1', changed:false, locked:false, stock:56, procStatus:'In Stock' },
  { id:'el42', evId:'ev3', nodeId:'ab3', n:2, type:'Material', desc:'Metal Stud 50mm', qty:62, unit:'lm', uc:850, us:1100, lh:0, waste:3, markup:29, src:'catalog', supplier:'BuildMart LLC', templateId:'t1', changed:false, locked:false, stock:85, procStatus:'In Stock' },
  { id:'el43', evId:'ev3', nodeId:'ab3', n:3, type:'Material', desc:'Metal Track 50mm', qty:55, unit:'lm', uc:780, us:1000, lh:0, waste:3, markup:28, src:'catalog', supplier:'BuildMart LLC', templateId:'t1', changed:false, locked:false, stock:65, procStatus:'In Stock' },
  { id:'el44', evId:'ev3', nodeId:'ab3', n:4, type:'Labor', desc:'Drywall Installation', qty:130, unit:'hr', uc:3500, us:5000, lh:130, waste:0, markup:43, src:'norm', supplier:'—', templateId:'t1', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el45', evId:'ev3', nodeId:'ab3', n:5, type:'Material', desc:'Ceramic Tile 600x600 Grey', qty:48, unit:'sqm', uc:8500, us:11000, lh:0, waste:10, markup:29, src:'catalog', supplier:'MegaCeram Armenia', templateId:'t4', changed:false, locked:false, stock:57, procStatus:'In Stock' },
  { id:'el46', evId:'ev3', nodeId:'ab3', n:6, type:'Labor', desc:'Tile Laying', qty:65, unit:'hr', uc:4000, us:5800, lh:65, waste:0, markup:45, src:'norm', supplier:'—', templateId:'t4', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el47', evId:'ev3', nodeId:'ab3', n:7, type:'Material', desc:'Glass Partition Module', qty:8, unit:'module', uc:45000, us:58000, lh:0, waste:0, markup:29, src:'supplier_quote', supplier:'GlassLine Studio', templateId:'t6', changed:false, locked:false, stock:8, procStatus:'In Stock' },
  { id:'el48', evId:'ev3', nodeId:'ab3', n:8, type:'Labor', desc:'Glass Partition Install', qty:12, unit:'hr', uc:4200, us:6000, lh:12, waste:0, markup:43, src:'norm', supplier:'—', templateId:'t6', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el49', evId:'ev3', nodeId:'ab4', n:9, type:'Material', desc:'Gypsum Board 12.5mm', qty:45, unit:'sheet', uc:3200, us:4100, lh:0, waste:5, markup:28, src:'catalog', supplier:'BuildMart LLC', templateId:'t1', changed:false, locked:false, stock:56, procStatus:'In Stock' },
  { id:'el50', evId:'ev3', nodeId:'ab4', n:10, type:'Material', desc:'Metal Stud 50mm', qty:35, unit:'lm', uc:850, us:1100, lh:0, waste:3, markup:29, src:'catalog', supplier:'BuildMart LLC', templateId:'t1', changed:false, locked:false, stock:85, procStatus:'In Stock' },
  { id:'el51', evId:'ev3', nodeId:'ab4', n:11, type:'Labor', desc:'Drywall Installation', qty:72, unit:'hr', uc:3500, us:5000, lh:72, waste:0, markup:43, src:'norm', supplier:'—', templateId:'t1', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el52', evId:'ev3', nodeId:'ab4', n:12, type:'Material', desc:'LED Panel 600x600', qty:8, unit:'pcs', uc:18500, us:24000, lh:0, waste:0, markup:30, src:'catalog', supplier:'ElectroHouse', templateId:'t3', changed:false, locked:false, stock:12, procStatus:'In Stock' },
  { id:'el53', evId:'ev3', nodeId:'ab4', n:13, type:'Material', desc:'Electrical Cable NYM 3x2.5', qty:120, unit:'meter', uc:420, us:550, lh:0, waste:5, markup:31, src:'catalog', supplier:'ElectroHouse', templateId:null, changed:false, locked:false, stock:350, procStatus:'In Stock' },
  { id:'el54', evId:'ev3', nodeId:'ab4', n:14, type:'Labor', desc:'Electrical Installation', qty:45, unit:'hr', uc:4500, us:6500, lh:45, waste:0, markup:44, src:'norm', supplier:'—', templateId:null, changed:false, locked:false, stock:null, procStatus:null },
  { id:'el55', evId:'ev3', nodeId:'ab5', n:15, type:'Material', desc:'Laminate Flooring AC4 Oak', qty:22, unit:'sqm', uc:7200, us:9300, lh:0, waste:8, markup:29, src:'catalog', supplier:'ProfiShin LLC', templateId:null, changed:false, locked:false, stock:50, procStatus:'In Stock' },
  { id:'el56', evId:'ev3', nodeId:'ab5', n:16, type:'Labor', desc:'Flooring Installation', qty:14, unit:'hr', uc:3200, us:4600, lh:14, waste:0, markup:44, src:'norm', supplier:'—', templateId:null, changed:false, locked:false, stock:null, procStatus:null },
  { id:'el57', evId:'ev3', nodeId:'ab6', n:17, type:'Material', desc:'Door Leaf MDF White', qty:2, unit:'pcs', uc:28000, us:36000, lh:0, waste:0, markup:29, src:'catalog', supplier:'ProfiShin LLC', templateId:null, changed:false, locked:false, stock:12, procStatus:'In Stock' },
  { id:'el58', evId:'ev3', nodeId:'ab6', n:18, type:'Labor', desc:'Door Installation', qty:4, unit:'hr', uc:3500, us:5000, lh:4, waste:0, markup:43, src:'norm', supplier:'—', templateId:null, changed:false, locked:false, stock:null, procStatus:null },
  { id:'el59', evId:'ev3', nodeId:'ab6', n:19, type:'Material', desc:'Interior Paint White 15L', qty:3, unit:'bucket', uc:12500, us:16000, lh:0, waste:5, markup:28, src:'catalog', supplier:'NorNerk Paints', templateId:'t2', changed:false, locked:false, stock:8, procStatus:'Low Stock' },
  { id:'el60', evId:'ev3', nodeId:'ab7', n:20, type:'Material', desc:'Ceramic Tile 600x600 Grey', qty:18, unit:'sqm', uc:8500, us:11000, lh:0, waste:10, markup:29, src:'catalog', supplier:'MegaCeram Armenia', templateId:'t5', changed:false, locked:false, stock:57, procStatus:'In Stock' },
  { id:'el61', evId:'ev3', nodeId:'ab7', n:21, type:'Material', desc:'Tile Adhesive 25kg', qty:6, unit:'bag', uc:3800, us:4900, lh:0, waste:0, markup:29, src:'last_purchase', supplier:'MegaCeram Armenia', templateId:'t5', changed:false, locked:false, stock:27, procStatus:'In Stock' },
  { id:'el62', evId:'ev3', nodeId:'ab7', n:22, type:'Material', desc:'Moisture Resistant Board 12.5mm', qty:8, unit:'sheet', uc:4800, us:6200, lh:0, waste:5, markup:29, src:'catalog', supplier:'BuildMart LLC', templateId:'t5', changed:false, locked:false, stock:29, procStatus:'In Stock' },
  { id:'el63', evId:'ev3', nodeId:'ab7', n:23, type:'Labor', desc:'Bathroom Tile Labor', qty:28, unit:'hr', uc:4000, us:5800, lh:28, waste:0, markup:45, src:'norm', supplier:'—', templateId:'t5', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el64', evId:'ev3', nodeId:'ab9', n:24, type:'Material', desc:'Glass Partition Module', qty:4, unit:'module', uc:45000, us:58000, lh:0, waste:0, markup:29, src:'supplier_quote', supplier:'GlassLine Studio', templateId:'t6', changed:false, locked:false, stock:8, procStatus:'In Stock' },
  { id:'el65', evId:'ev3', nodeId:'ab9', n:25, type:'Material', desc:'Door Leaf MDF White', qty:1, unit:'pcs', uc:28000, us:36000, lh:0, waste:0, markup:29, src:'catalog', supplier:'ProfiShin LLC', templateId:null, changed:false, locked:false, stock:12, procStatus:'In Stock' },
  { id:'el66', evId:'ev3', nodeId:'ab9', n:26, type:'Material', desc:'Laminate Flooring AC4 Oak', qty:16, unit:'sqm', uc:7200, us:9300, lh:0, waste:8, markup:29, src:'catalog', supplier:'ProfiShin LLC', templateId:null, changed:false, locked:false, stock:50, procStatus:'In Stock' },
  { id:'el67', evId:'ev3', nodeId:'ab9', n:27, type:'Labor', desc:'Flooring Installation', qty:10, unit:'hr', uc:3200, us:4600, lh:10, waste:0, markup:44, src:'norm', supplier:'—', templateId:null, changed:false, locked:false, stock:null, procStatus:null },
  { id:'el68', evId:'ev3', nodeId:'ab10', n:28, type:'Material', desc:'Interior Paint White 15L', qty:4, unit:'bucket', uc:12500, us:16000, lh:0, waste:5, markup:28, src:'catalog', supplier:'NorNerk Paints', templateId:'t2', changed:false, locked:false, stock:8, procStatus:'Low Stock' },
  { id:'el69', evId:'ev3', nodeId:'ab10', n:29, type:'Labor', desc:'Painting Works', qty:18, unit:'hr', uc:3000, us:4500, lh:18, waste:0, markup:50, src:'norm', supplier:'—', templateId:'t2', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el70', evId:'ev3', nodeId:'ab11', n:30, type:'Material', desc:'Electrical Cable NYM 3x2.5', qty:200, unit:'meter', uc:420, us:550, lh:0, waste:5, markup:31, src:'catalog', supplier:'ElectroHouse', templateId:null, changed:false, locked:false, stock:350, procStatus:'In Stock' },
  { id:'el71', evId:'ev3', nodeId:'ab11', n:31, type:'Material', desc:'PVC Conduit 20mm', qty:100, unit:'meter', uc:180, us:240, lh:0, waste:5, markup:33, src:'catalog', supplier:'ElectroHouse', templateId:null, changed:false, locked:false, stock:180, procStatus:'In Stock' },
  { id:'el72', evId:'ev3', nodeId:'ab11', n:32, type:'Labor', desc:'Electrical Installation', qty:55, unit:'hr', uc:4500, us:6500, lh:55, waste:0, markup:44, src:'norm', supplier:'—', templateId:null, changed:false, locked:false, stock:null, procStatus:null },
  { id:'el73', evId:'ev3', nodeId:'ab12', n:33, type:'Material', desc:'Ceramic Tile 600x600 Grey', qty:12, unit:'sqm', uc:8500, us:11000, lh:0, waste:10, markup:29, src:'catalog', supplier:'MegaCeram Armenia', templateId:'t5', changed:false, locked:false, stock:57, procStatus:'In Stock' },
  { id:'el74', evId:'ev3', nodeId:'ab12', n:34, type:'Labor', desc:'Bathroom Tile Labor', qty:16, unit:'hr', uc:4000, us:5800, lh:16, waste:0, markup:45, src:'norm', supplier:'—', templateId:'t5', changed:false, locked:false, stock:null, procStatus:null },
  { id:'el75', evId:'ev3', nodeId:'ab8', n:35, type:'Subcontract', desc:'HVAC Duct Installation', qty:1, unit:'lumpsum', uc:620000, us:780000, lh:0, waste:0, markup:26, src:'manual', supplier:'SubCo: HVAC Pro', templateId:null, changed:false, locked:true, stock:null, procStatus:null },
  { id:'el76', evId:'ev3', nodeId:'ab2', n:36, type:'Subcontract', desc:'Plumbing Rough-In Package', qty:1, unit:'lumpsum', uc:520000, us:650000, lh:0, waste:0, markup:25, src:'manual', supplier:'SubCo: PipeWorks', templateId:null, changed:false, locked:true, stock:null, procStatus:null },
  { id:'el77', evId:'ev3', nodeId:'ab1', n:37, type:'Equipment', desc:'Scaffolding Rental', qty:3, unit:'week', uc:45000, us:58000, lh:0, waste:0, markup:29, src:'manual', supplier:'—', templateId:null, changed:false, locked:true, stock:null, procStatus:null },
  { id:'el78', evId:'ev3', nodeId:'ab1', n:38, type:'Misc', desc:'Clean-up and Waste Disposal', qty:1, unit:'lumpsum', uc:95000, us:125000, lh:0, waste:0, markup:32, src:'manual', supplier:'—', templateId:null, changed:false, locked:false, stock:null, procStatus:null },
];

// Version comparison data
const versionCompare = {
  a: 'ev4', b: 'ev5', aLabel: 'v1.0 Baseline', bLabel: 'v1.1 with CO-001',
  totalCostDelta: 3500000, totalSalesDelta: 4200000, marginDelta: 0.0,
  changes: [
    { node: 'Apartment 203', type: 'Modified', desc: 'Increased ceramic tile qty from 42 to 54 sqm', costDelta: 1020000 },
    { node: 'Apartment 203', type: 'Modified', desc: 'Increased tile adhesive from 14 to 18 bags', costDelta: 152000 },
    { node: 'Apartment 203', type: 'New', desc: 'Added Moisture Resistant Board (full height tiling)', costDelta: 576000 },
    { node: 'Apartment 203', type: 'Modified', desc: 'Bathroom tile labor increased from 52 to 68 hours', costDelta: 640000 },
    { node: 'Apartment 203', type: 'New', desc: 'Added waterproofing membrane 24 sqm', costDelta: 864000 },
    { node: 'Corridor F2', type: 'Modified', desc: 'Added tile skirting — 40 lm', costDelta: 248000 },
  ]
};
const fmt = (v) => { if(v==null) return '—'; const a=Math.abs(v); if(a>=1e6) return `${(v/1e6).toFixed(1)}M ֏`; if(a>=1e3) return `${Math.round(v/1e3)}K ֏`; return `${v.toLocaleString()} ֏`; };
const fmtFull = (v) => v==null?'—':`${v.toLocaleString()} ֏`;
const getUser = (id) => users.find(u=>u.id===id) || { name: '—', initials: '—', role: '—' };
const getClient = (id) => clients.find(c=>c.id===id) || { name: '—' };
const getProject = (id) => projects.find(p=>p.id===id) || null;
const getMaterial = (id) => materials.find(m=>m.id===id) || { name: '—' };
const getNode = (projectId, nodeId) => (projectNodes[projectId]||[]).find(n=>n.id===nodeId) || null;
const getLocation = (id) => inventoryLocations.find(l => l.id === id) || { id, name: '—', code: '—', type: 'unknown' };

// ============================================================
// STYLES
// ============================================================
const COLORS = {
  bg: '#F5F4F1',
  sidebar: '#1C1E26',
  sidebarHover: '#2A2D38',
  sidebarActive: '#363944',
  topbar: '#FFFFFF',
  card: '#FFFFFF',
  border: '#E2E0DB',
  borderLight: '#EEEDE9',
  text: '#1C1E26',
  textSecondary: '#6B6E7B',
  textMuted: '#9B9DA8',
  accent: '#2563EB',
  accentLight: '#EFF6FF',
  green: '#16A34A',
  greenLight: '#F0FDF4',
  red: '#DC2626',
  redLight: '#FEF2F2',
  orange: '#EA580C',
  orangeLight: '#FFF7ED',
  yellow: '#CA8A04',
  yellowLight: '#FEFCE8',
  purple: '#7C3AED',
};

// ============================================================
// COMPONENT: StatusBadge
// ============================================================
function StatusBadge({ status, size = 'sm' }) {
  const map = {
    'Execution': { bg: '#DBEAFE', color: '#1D4ED8' },
    'Finishing': { bg: '#D1FAE5', color: '#065F46' },
    'Estimating': { bg: '#FEF3C7', color: '#92400E' },
    'Mobilization': { bg: '#E0E7FF', color: '#3730A3' },
    'High': { bg: '#FEE2E2', color: '#991B1B' },
    'Medium': { bg: '#FEF3C7', color: '#92400E' },
    'Low': { bg: '#D1FAE5', color: '#065F46' },
    'Pending': { bg: '#FEF3C7', color: '#92400E' },
    'Pending Approval': { bg: '#FEF3C7', color: '#92400E' },
    'Approved': { bg: '#D1FAE5', color: '#065F46' },
    'Fulfilled': { bg: '#D1FAE5', color: '#065F46' },
    'Partially Fulfilled': { bg: '#DBEAFE', color: '#1D4ED8' },
    'Submitted': { bg: '#E0E7FF', color: '#3730A3' },
    'Draft': { bg: '#F3F4F6', color: '#6B7280' },
    'Superseded': { bg: '#F3F4F6', color: '#6B7280' },
    'Rejected': { bg: '#FEE2E2', color: '#991B1B' },
    'Accepted': { bg: '#D1FAE5', color: '#065F46' },
    'Accepted with Discrepancy': { bg: '#FEF3C7', color: '#92400E' },
    'Pending Receipt': { bg: '#E0E7FF', color: '#3730A3' },
    'Urgent': { bg: '#FEE2E2', color: '#991B1B' },
    'Normal': { bg: '#F3F4F6', color: '#6B7280' },
    'In Progress':         { bg: '#DBEAFE', color: '#1D4ED8' },
    'In Transit':          { bg: '#BFDBFE', color: '#1E40AF' },
    'Picked':              { bg: '#E0E7FF', color: '#3730A3' },
    'Partially Received':  { bg: '#FEF3C7', color: '#92400E' },
    'Received':            { bg: '#D1FAE5', color: '#065F46' },
    'Cancelled':           { bg: '#F3F4F6', color: '#6B7280' },
  };
  const s = map[status] || { bg: '#F3F4F6', color: '#6B7280' };
  return (
    <span style={{ display:'inline-flex',alignItems:'center',padding: size==='xs'?'1px 6px':'2px 10px',borderRadius:4,fontSize: size==='xs'?10:11,fontWeight:600,letterSpacing:'0.02em',background:s.bg,color:s.color,whiteSpace:'nowrap' }}>
      {status}
    </span>
  );
}

// ============================================================
// COMPONENT: ProgressBar
// ============================================================
function ProgressBar({ value, height = 6, color }) {
  const c = color || (value >= 80 ? COLORS.green : value >= 50 ? COLORS.accent : value >= 30 ? COLORS.orange : COLORS.red);
  return (
    <div style={{ width:'100%',height,background:'#E5E7EB',borderRadius:height/2,overflow:'hidden' }}>
      <div style={{ width:`${Math.min(value,100)}%`,height:'100%',background:c,borderRadius:height/2,transition:'width 0.3s' }}/>
    </div>
  );
}

// ============================================================
// COMPONENT: KpiCard
// ============================================================
function KpiCard({ label, value, sub, icon: Icon, color = COLORS.accent, onClick }) {
  return (
    <div onClick={onClick} style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:'16px 20px',cursor: onClick?'pointer':'default',transition:'box-shadow 0.15s',minWidth:0 }}
      onMouseEnter={e=>{ if(onClick) e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'; }}
      onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8 }}>
        <span style={{ fontSize:12,color:COLORS.textSecondary,fontWeight:500 }}>{label}</span>
        {Icon && <Icon size={16} style={{ color }} />}
      </div>
      <div style={{ fontSize:22,fontWeight:700,color:COLORS.text,lineHeight:1.2 }}>{value}</div>
      {sub && <div style={{ fontSize:11,color:COLORS.textMuted,marginTop:4 }}>{sub}</div>}
    </div>
  );
}

// ============================================================
// COMPONENT: Toast
// ============================================================
function Toast({ message, visible, onClose }) {
  if(!visible) return null;
  return (
    <div style={{ position:'fixed',bottom:24,right:24,background:'#1C1E26',color:'white',padding:'12px 20px',borderRadius:8,fontSize:13,fontWeight:500,zIndex:9999,display:'flex',alignItems:'center',gap:10,boxShadow:'0 8px 30px rgba(0,0,0,0.2)',animation:'slideUp 0.3s ease' }}>
      <Check size={16} style={{ color:COLORS.green }} />
      {message}
      <X size={14} style={{ cursor:'pointer',opacity:0.6 }} onClick={onClose} />
    </div>
  );
}

// ============================================================
// COMPONENT: TreeView
// ============================================================
function TreeView({ nodes, selectedId, onSelect, projectId }) {
  const [expanded, setExpanded] = useState(new Set(nodes.filter(n=>n.level<2).map(n=>n.id)));
  const toggle = (id) => {
    const next = new Set(expanded);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpanded(next);
  };
  const roots = nodes.filter(n=>!n.parentId);
  const renderNode = (node, depth=0) => {
    const children = nodes.filter(n=>n.parentId===node.id);
    const hasChildren = children.length > 0;
    const isExpanded = expanded.has(node.id);
    const isSelected = node.id === selectedId;
    return (
      <div key={node.id}>
        <div onClick={() => { onSelect(node.id); if(hasChildren) toggle(node.id); }}
          style={{ display:'flex',alignItems:'center',padding:'6px 8px',paddingLeft: 8+depth*20,cursor:'pointer',borderRadius:4,background: isSelected?COLORS.accentLight:'transparent',borderLeft: isSelected?`3px solid ${COLORS.accent}`:'3px solid transparent',fontSize:13,transition:'background 0.1s',gap:6 }}
          onMouseEnter={e=>{ if(!isSelected) e.currentTarget.style.background='#F9FAFB'; }}
          onMouseLeave={e=>{ if(!isSelected) e.currentTarget.style.background='transparent'; }}>
          {hasChildren ? (isExpanded ? <ChevronDown size={14} style={{ color:COLORS.textMuted,flexShrink:0 }} /> : <ChevronRight size={14} style={{ color:COLORS.textMuted,flexShrink:0 }} />) : <span style={{ width:14,flexShrink:0 }} />}
          <span style={{ fontWeight: isSelected?600:400,color:COLORS.text,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{node.name}</span>
          <span style={{ fontSize:10,color:COLORS.textMuted,flexShrink:0 }}>{node.progress}%</span>
        </div>
        {isExpanded && children.map(c=>renderNode(c,depth+1))}
      </div>
    );
  };
  return <div>{roots.map(n=>renderNode(n))}</div>;
}

// ============================================================
// MAIN APP COMPONENT
// ============================================================
export default function BergApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentRole, setCurrentRole] = useState('Director');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectTab, setSelectedProjectTab] = useState('overview');
  const [selectedNode, setSelectedNode] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMR, setSelectedMR] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [transferOrders, setTransferOrders] = useState(seedTransferOrders);
  const [inventoryMovements, setInventoryMovements] = useState(seedInventoryMovements);
  const [selectedTransferId, setSelectedTransferId] = useState(null);

  const showToast = (msg) => {
    setToast({ visible:true, message:msg });
    setTimeout(()=>setToast({ visible:false, message:'' }), 3000);
  };

  // ============================================================
  // STOCK LOGIC
  // ============================================================
  const getBalanceAtLocation = (locationId, materialId) => {
    const loc = inventoryLocations.find(l => l.id === locationId);
    if (!loc) return { onHand:0, reserved:0, available:0 };
    if (loc.type === 'warehouse') {
      const s = warehouseStock.find(s => s.materialId === materialId);
      if (!s) return { onHand:0, reserved:0, available:0 };
      return { onHand:s.onHand, reserved:s.reserved, available:s.available };
    }
    if (loc.type === 'project_area') {
      const items = projectStock.filter(s => s.materialId === materialId && s.projectId === loc.projectId && s.areaId === loc.areaId);
      const qty = items.reduce((sum,s) => sum + (s.status==='available' ? s.qty : 0), 0);
      return { onHand:qty, reserved:0, available:qty };
    }
    return { onHand:0, reserved:0, available:0 };
  };

  const reserveStock = (locationId, materialId, qty, transferOrderId, userId) => {
    setInventoryMovements(prev => [...prev, {
      id:`im-${Date.now()}`, movementType:'reserve', materialId, qty,
      uom: materials.find(m=>m.id===materialId)?.unit||'',
      fromLocationId:locationId, toLocationId:null,
      referenceType:'transfer_order', referenceId:transferOrderId,
      performedByUserId:userId, timestamp:new Date().toISOString(),
      note:`Reserved for ${transferOrderId}`
    }]);
  };

  const cancelReservation = (locationId, materialId, qty, transferOrderId, userId) => {
    setInventoryMovements(prev => [...prev, {
      id:`im-${Date.now()}`, movementType:'unreserve', materialId, qty,
      uom: materials.find(m=>m.id===materialId)?.unit||'',
      fromLocationId:locationId, toLocationId:null,
      referenceType:'transfer_order', referenceId:transferOrderId,
      performedByUserId:userId, timestamp:new Date().toISOString(),
      note:`Reservation released — ${transferOrderId}`
    }]);
  };

  const issueStock = (fromLocationId, toLocationId, materialId, qty, transferOrderId, userId) => {
    setInventoryMovements(prev => [...prev, {
      id:`im-${Date.now()}`, movementType:'issue', materialId, qty,
      uom: materials.find(m=>m.id===materialId)?.unit||'',
      fromLocationId, toLocationId,
      referenceType:'transfer_order', referenceId:transferOrderId,
      performedByUserId:userId, timestamp:new Date().toISOString(),
      note:`Issued for ${transferOrderId}`
    }]);
  };

  const receiveStock = (toLocationId, materialId, qty, transferOrderId, userId) => {
    setInventoryMovements(prev => [...prev, {
      id:`im-${Date.now()}`, movementType:'receipt', materialId, qty,
      uom: materials.find(m=>m.id===materialId)?.unit||'',
      fromLocationId:null, toLocationId,
      referenceType:'transfer_order', referenceId:transferOrderId,
      performedByUserId:userId, timestamp:new Date().toISOString(),
      note:`Received at destination — ${transferOrderId}`
    }]);
  };

  // ============================================================
  // TRANSFER LIFECYCLE
  // ============================================================
  const submitTransfer = (transferId) => {
    setTransferOrders(prev => prev.map(t =>
      t.id===transferId ? {...t, status:'Submitted', updatedAt:new Date().toISOString()} : t
    ));
    showToast('Transfer submitted for approval');
  };

  const approveTransfer = (transferId) => {
    setTransferOrders(prev => prev.map(t => {
      if (t.id!==transferId) return t;
      t.lines.forEach(line => reserveStock(t.sourceLocationId, line.materialId, line.requestedQty, transferId, currentUser.id));
      return {...t, status:'Approved', approvedByUserId:currentUser.id, lines:t.lines.map(l=>({...l,approvedQty:l.requestedQty})), updatedAt:new Date().toISOString()};
    }));
    showToast('Transfer approved — stock reserved');
  };

  const pickTransfer = (transferId) => {
    setTransferOrders(prev => prev.map(t =>
      t.id===transferId ? {...t, status:'Picked', pickedByUserId:currentUser.id, lines:t.lines.map(l=>({...l,pickedQty:l.approvedQty})), updatedAt:new Date().toISOString()} : t
    ));
    showToast('Transfer marked as picked');
  };

  const sendTransfer = (transferId) => {
    setTransferOrders(prev => prev.map(t => {
      if (t.id!==transferId) return t;
      t.lines.forEach(line => issueStock(t.sourceLocationId, t.destinationLocationId, line.materialId, line.pickedQty, transferId, currentUser.id));
      return {...t, status:'In Transit', sentAt:new Date().toISOString(), lines:t.lines.map(l=>({...l,shippedQty:l.pickedQty})), updatedAt:new Date().toISOString()};
    }));
    showToast('Transfer marked as In Transit');
  };

  const receiveTransfer = (transferId, receiptLines) => {
    setTransferOrders(prev => prev.map(t => {
      if (t.id!==transferId) return t;
      const updatedLines = t.lines.map(line => {
        const receipt = receiptLines.find(r => r.lineId===line.id);
        if (!receipt) return line;
        receiveStock(t.destinationLocationId, line.materialId, receipt.receivedQty, transferId, currentUser.id);
        return {...line, receivedQty:receipt.receivedQty, conditionNote:receipt.conditionNote, discrepancyNote:receipt.discrepancyNote};
      });
      const allOk = updatedLines.every(l => l.receivedQty >= l.shippedQty);
      const hasDisc = updatedLines.some(l => l.discrepancyNote);
      const someRec = updatedLines.some(l => l.receivedQty > 0);
      return {...t, status:(allOk&&!hasDisc)?'Received':someRec?'Partially Received':t.status, receivedByUserId:currentUser.id, receivedAt:new Date().toISOString(), lines:updatedLines, updatedAt:new Date().toISOString()};
    }));
    showToast('Receipt recorded');
  };

  const cancelTransfer = (transferId) => {
    setTransferOrders(prev => prev.map(t => {
      if (t.id!==transferId) return t;
      if (['Approved','Picked'].includes(t.status)) {
        t.lines.forEach(line => cancelReservation(t.sourceLocationId, line.materialId, line.approvedQty, transferId, currentUser.id));
      }
      return {...t, status:'Cancelled', updatedAt:new Date().toISOString()};
    }));
    showToast('Transfer cancelled');
  };

  const openProject = (projectId) => {
    setSelectedProject(projectId);
    setSelectedProjectTab('overview');
    setSelectedNode(null);
    setCurrentPage('project-workspace');
  };

  const currentUser = users.find(u=>u.role===currentRole) || users[0];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'Projects', icon: Building2 },
    { id: 'estimates', label: 'Estimates', icon: Calculator },
    { id: 'materials', label: 'Materials', icon: Package },
    { id: 'warehouse', label: 'Warehouse', icon: Warehouse },
    { id: 'transfers', label: 'Transfers', icon: ArrowLeftRight },
    { id: 'field-reports', label: 'Field Reports', icon: ClipboardList },
    { id: 'timesheets', label: 'Timesheets', icon: Clock },
    { id: 'approvals', label: 'Approvals', icon: CheckSquare },
    { id: 'catalogs', label: 'Catalogs', icon: BookOpen },
    { id: 'admin', label: 'Admin', icon: Settings },
  ];

  const pendingApprovals = approvals.filter(a=>a.status==='Pending').length;

  // ============================================================
  // PAGE: Dashboard
  // ============================================================
  const DashboardPage = () => {
    const totalBaseline = projects.reduce((s,p)=>s+p.baseline,0);
    const totalActual = projects.reduce((s,p)=>s+p.actual,0);
    const atRisk = projects.filter(p=>p.risk==='High'||p.risk==='Medium');
    const budgetData = projects.map(p=>({name:p.code.replace('BRG-',''),baseline:p.baseline/1e6,actual:p.actual/1e6}));
    const pendingMR = materialRequests.filter(r=>['Submitted','Pending Approval'].includes(r.status));
    const missingReports = 2;

    return (
      <div>
        <div style={{ marginBottom:24 }}>
          <h1 style={{ fontSize:22,fontWeight:700,color:COLORS.text,margin:0 }}>Portfolio Dashboard</h1>
          <p style={{ fontSize:13,color:COLORS.textSecondary,margin:'4px 0 0' }}>March 10, 2025 — Overview of all active projects</p>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:12,marginBottom:24 }}>
          <KpiCard label="Active Projects" value={projects.length} icon={Building2} color={COLORS.accent} onClick={()=>setCurrentPage('projects')} />
          <KpiCard label="Total Baseline" value={fmt(totalBaseline)} icon={DollarSign} color={COLORS.accent} />
          <KpiCard label="Total Actual" value={fmt(totalActual)} icon={TrendingUp} color={COLORS.green} />
          <KpiCard label="Budget at Risk" value={fmt(totalActual-totalBaseline>0?totalActual-totalBaseline:0)} sub={atRisk.length+" projects flagged"} icon={AlertTriangle} color={COLORS.orange} />
          <KpiCard label="Pending Approvals" value={pendingApprovals} icon={CheckSquare} color={COLORS.yellow} onClick={()=>setCurrentPage('approvals')} />
          <KpiCard label="Missing Reports" value={missingReports} icon={FileText} color={COLORS.red} onClick={()=>setCurrentPage('field-reports')} />
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,marginBottom:16 }}>
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:20 }}>
            <h3 style={{ fontSize:14,fontWeight:600,margin:'0 0 16px',color:COLORS.text }}>Budget by Project (AMD millions)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={budgetData} barGap={4}>
                <XAxis dataKey="name" tick={{ fontSize:11 }} />
                <YAxis tick={{ fontSize:11 }} />
                <Tooltip formatter={(v)=>`${v.toFixed(1)}M ֏`} />
                <Bar dataKey="baseline" fill="#CBD5E1" name="Baseline" radius={[3,3,0,0]} />
                <Bar dataKey="actual" fill={COLORS.accent} name="Actual" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:20 }}>
            <h3 style={{ fontSize:14,fontWeight:600,margin:'0 0 12px',color:COLORS.text }}>Approval Queue</h3>
            <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
              {approvals.filter(a=>a.status==='Pending').slice(0,5).map(a=>(
                <div key={a.id} onClick={()=>{setSelectedApproval(a.id);setCurrentPage('approvals');}} style={{ padding:'10px 12px',background:'#FAFAF8',borderRadius:6,cursor:'pointer',borderLeft:`3px solid ${a.priority==='Urgent'?COLORS.red:a.priority==='High'?COLORS.orange:COLORS.accent}` }}
                  onMouseEnter={e=>e.currentTarget.style.background='#F0F0EC'}
                  onMouseLeave={e=>e.currentTarget.style.background='#FAFAF8'}>
                  <div style={{ fontSize:12,fontWeight:600,color:COLORS.text,marginBottom:2 }}>{a.type}</div>
                  <div style={{ fontSize:11,color:COLORS.textSecondary }}>{a.description.slice(0,60)}...</div>
                  <div style={{ display:'flex',justifyContent:'space-between',marginTop:4 }}>
                    <span style={{ fontSize:10,color:COLORS.textMuted }}>{a.submitted}</span>
                    <StatusBadge status={a.priority} size="xs" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:20 }}>
            <h3 style={{ fontSize:14,fontWeight:600,margin:'0 0 12px',color:COLORS.text }}>Projects at Risk</h3>
            <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
              <thead>
                <tr style={{ borderBottom:`1px solid ${COLORS.border}` }}>
                  <th style={{ textAlign:'left',padding:'8px 6px',fontWeight:600,color:COLORS.textSecondary }}>Project</th>
                  <th style={{ textAlign:'right',padding:'8px 6px',fontWeight:600,color:COLORS.textSecondary }}>Variance</th>
                  <th style={{ textAlign:'center',padding:'8px 6px',fontWeight:600,color:COLORS.textSecondary }}>Risk</th>
                  <th style={{ textAlign:'center',padding:'8px 6px',fontWeight:600,color:COLORS.textSecondary }}>Progress</th>
                </tr>
              </thead>
              <tbody>
                {projects.filter(p=>p.risk!=='Low').map(p=>{
                  const variance = p.actual - (p.baseline * p.completion / 100);
                  return (
                    <tr key={p.id} onClick={()=>openProject(p.id)} style={{ borderBottom:`1px solid ${COLORS.borderLight}`,cursor:'pointer' }}
                      onMouseEnter={e=>e.currentTarget.style.background='#FAFAF8'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <td style={{ padding:'8px 6px' }}>
                        <div style={{ fontWeight:500 }}>{p.code}</div>
                        <div style={{ color:COLORS.textMuted,fontSize:11 }}>{p.name.split('–')[0].trim()}</div>
                      </td>
                      <td style={{ textAlign:'right',padding:'8px 6px',color: variance>0?COLORS.red:COLORS.green,fontWeight:500 }}>{fmt(variance)}</td>
                      <td style={{ textAlign:'center',padding:'8px 6px' }}><StatusBadge status={p.risk} size="xs" /></td>
                      <td style={{ padding:'8px 6px',width:80 }}><ProgressBar value={p.completion} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:20 }}>
            <h3 style={{ fontSize:14,fontWeight:600,margin:'0 0 12px',color:COLORS.text }}>Material Alerts</h3>
            <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
              {pendingMR.map(mr=>(
                <div key={mr.id} style={{ padding:'10px 12px',background:'#FAFAF8',borderRadius:6,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                  <div>
                    <div style={{ fontSize:12,fontWeight:500,color:COLORS.text }}>{mr.id}</div>
                    <div style={{ fontSize:11,color:COLORS.textSecondary }}>{getProject(mr.projectId)?.code} · {getNode(mr.projectId,mr.nodeId)?.name||'—'}</div>
                  </div>
                  <div style={{ display:'flex',alignItems:'center',gap:6 }}>
                    <StatusBadge status={mr.priority} size="xs" />
                    <StatusBadge status={mr.status} size="xs" />
                  </div>
                </div>
              ))}
              <div style={{ padding:'10px 12px',background:COLORS.redLight,borderRadius:6 }}>
                <div style={{ fontSize:12,fontWeight:600,color:COLORS.red }}>Low Stock Alert</div>
                <div style={{ fontSize:11,color:COLORS.textSecondary,marginTop:2 }}>5 items below threshold: Interior Paint, Primer, Switch Sets, Glass Partition, Mineral Wool</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:20,marginTop:16 }}>
          <h3 style={{ fontSize:14,fontWeight:600,margin:'0 0 12px',color:COLORS.text }}>Recent Field Activity</h3>
          <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
            {weeklyReports.slice(0,5).map(wr=>(
              <div key={wr.id} style={{ display:'flex',alignItems:'center',gap:12,padding:'8px 0',borderBottom:`1px solid ${COLORS.borderLight}`,fontSize:12 }}>
                <div style={{ width:6,height:6,borderRadius:3,background: wr.blockerFlag?COLORS.red:COLORS.green,flexShrink:0 }} />
                <span style={{ fontWeight:500,minWidth:70 }}>{wr.week}</span>
                <span style={{ color:COLORS.textSecondary }}>{getProject(wr.projectId)?.code}</span>
                <span style={{ flex:1 }}>{getNode(wr.projectId,wr.nodeId)?.name||'General'} — {wr.summary.slice(0,60)}...</span>
                <span style={{ display:'flex',alignItems:'center',gap:4,color:COLORS.textMuted }}><Camera size={12}/>{wr.photoCount}</span>
                {wr.blockerFlag && <span style={{ color:COLORS.red,fontWeight:600,fontSize:10 }}>BLOCKER</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // PAGE: Projects List
  // ============================================================
  const ProjectsListPage = () => {
    const [filter, setFilter] = useState('');
    const [stageFilter, setStageFilter] = useState('All');
    const filtered = projects.filter(p=>{
      if(stageFilter!=='All' && p.stage!==stageFilter) return false;
      if(filter && !p.name.toLowerCase().includes(filter.toLowerCase()) && !p.code.toLowerCase().includes(filter.toLowerCase())) return false;
      return true;
    });

    return (
      <div>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20 }}>
          <div>
            <h1 style={{ fontSize:22,fontWeight:700,color:COLORS.text,margin:0 }}>Projects</h1>
            <p style={{ fontSize:13,color:COLORS.textSecondary,margin:'4px 0 0' }}>{projects.length} active projects</p>
          </div>
          <button style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 16px',fontSize:13,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:6 }}>
            <Plus size={14}/>New Project
          </button>
        </div>

        <div style={{ display:'flex',gap:10,marginBottom:16 }}>
          <div style={{ position:'relative',flex:1 }}>
            <Search size={14} style={{ position:'absolute',left:10,top:9,color:COLORS.textMuted }}/>
            <input placeholder="Search projects..." value={filter} onChange={e=>setFilter(e.target.value)}
              style={{ width:'100%',padding:'8px 12px 8px 30px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:13,outline:'none',background:'white',boxSizing:'border-box' }}/>
          </div>
          <select value={stageFilter} onChange={e=>setStageFilter(e.target.value)}
            style={{ padding:'8px 12px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:13,outline:'none',background:'white',color:COLORS.text }}>
            <option>All</option>
            <option>Estimating</option>
            <option>Mobilization</option>
            <option>Execution</option>
            <option>Finishing</option>
          </select>
        </div>

        <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
          <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
            <thead>
              <tr style={{ background:'#FAFAF8' }}>
                {['Code','Project Name','Client','Type','Stage','PM','Baseline','Actual','Completion','Risk',''].map(h=>(
                  <th key={h} style={{ textAlign:'left',padding:'10px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p=>(
                <tr key={p.id} onClick={()=>openProject(p.id)} style={{ cursor:'pointer',borderBottom:`1px solid ${COLORS.borderLight}` }}
                  onMouseEnter={e=>e.currentTarget.style.background='#FAFAF8'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{ padding:'10px 12px',fontWeight:600,color:COLORS.accent }}>{p.code}</td>
                  <td style={{ padding:'10px 12px',fontWeight:500,maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{p.name}</td>
                  <td style={{ padding:'10px 12px',color:COLORS.textSecondary }}>{getClient(p.clientId).name}</td>
                  <td style={{ padding:'10px 12px',color:COLORS.textSecondary }}>{p.type}</td>
                  <td style={{ padding:'10px 12px' }}><StatusBadge status={p.stage} size="xs"/></td>
                  <td style={{ padding:'10px 12px',color:COLORS.textSecondary }}>{getUser(p.pmId).name.split(' ')[0]}</td>
                  <td style={{ padding:'10px 12px',textAlign:'right',fontWeight:500 }}>{fmt(p.baseline)}</td>
                  <td style={{ padding:'10px 12px',textAlign:'right',fontWeight:500 }}>{fmt(p.actual)}</td>
                  <td style={{ padding:'10px 12px',width:80 }}><ProgressBar value={p.completion}/></td>
                  <td style={{ padding:'10px 12px' }}><StatusBadge status={p.risk} size="xs"/></td>
                  <td style={{ padding:'10px 12px' }}>
                    <button onClick={e=>{e.stopPropagation();showToast('Opening Bitrix workspace...');}} style={{ background:'none',border:`1px solid ${COLORS.border}`,borderRadius:4,padding:'4px 8px',fontSize:10,cursor:'pointer',color:COLORS.textSecondary,display:'flex',alignItems:'center',gap:4 }}>
                      <ExternalLink size={10}/>Bitrix
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ============================================================
  // PAGE: Project Workspace
  // ============================================================
  const ProjectWorkspacePage = () => {
    const project = getProject(selectedProject);
    if(!project) return <div style={{ padding:40,textAlign:'center',color:COLORS.textMuted }}>Select a project</div>;

    const nodes = projectNodes[project.id] || [];
    const variance = project.actual - (project.baseline * project.completion / 100);
    const openMR = materialRequests.filter(r=>r.projectId===project.id && !['Fulfilled','Draft'].includes(r.status)).length;
    const pendingApp = approvals.filter(a=>a.projectId===project.id && a.status==='Pending').length;
    const lastReport = weeklyReports.filter(r=>r.projectId===project.id).sort((a,b)=>b.submittedDate.localeCompare(a.submittedDate))[0];

    const tabs = ['Overview','Structure','Estimate','Budget Control','Materials','Deliveries','Progress','Labor','Files & Links','Approvals'];

    return (
      <div>
        {/* Header */}
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20,flexWrap:'wrap',gap:12 }}>
          <div>
            <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:4 }}>
              <span style={{ fontSize:12,color:COLORS.textMuted,cursor:'pointer' }} onClick={()=>setCurrentPage('projects')}>Projects</span>
              <ChevronRight size={12} style={{ color:COLORS.textMuted }}/>
              <span style={{ fontSize:12,color:COLORS.accent,fontWeight:600 }}>{project.code}</span>
            </div>
            <h1 style={{ fontSize:20,fontWeight:700,color:COLORS.text,margin:0 }}>{project.name}</h1>
            <div style={{ display:'flex',gap:16,marginTop:6,fontSize:12,color:COLORS.textSecondary,flexWrap:'wrap' }}>
              <span>{getClient(project.clientId).name}</span>
              <span>PM: {getUser(project.pmId).name}</span>
              <span>Super: {getUser(project.superintendentId).name}</span>
              <StatusBadge status={project.stage} size="xs"/>
            </div>
          </div>
          <div style={{ display:'flex',gap:8 }}>
            <button onClick={()=>showToast('Opening Bitrix workspace...')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'8px 14px',fontSize:12,cursor:'pointer',display:'flex',alignItems:'center',gap:6,fontWeight:500 }}>
              <ExternalLink size={13}/>Open Bitrix Workspace
            </button>
            <button onClick={()=>showToast('Opening shared files...')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'8px 14px',fontSize:12,cursor:'pointer',display:'flex',alignItems:'center',gap:6,fontWeight:500 }}>
              <ExternalLink size={13}/>Shared Files
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))',gap:10,marginBottom:20 }}>
          <KpiCard label="Baseline Budget" value={fmt(project.baseline)} icon={DollarSign}/>
          <KpiCard label="Actual Spend" value={fmt(project.actual)} icon={TrendingUp} color={COLORS.green}/>
          <KpiCard label="Variance" value={fmt(variance)} icon={variance>0?TrendingDown:TrendingUp} color={variance>0?COLORS.red:COLORS.green}/>
          <KpiCard label="Open Requests" value={openMR} icon={Package} color={COLORS.orange}/>
          <KpiCard label="Pending Approvals" value={pendingApp} icon={CheckSquare} color={COLORS.yellow}/>
          <KpiCard label="Last Report" value={lastReport?.week||'—'} icon={FileText}/>
          <KpiCard label="Completion" value={`${project.completion}%`} icon={CircleDot} color={COLORS.accent}/>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex',gap:0,borderBottom:`1px solid ${COLORS.border}`,marginBottom:20,overflowX:'auto' }}>
          {tabs.map(tab=>(
            <button key={tab} onClick={()=>setSelectedProjectTab(tab.toLowerCase().replace(/ & /g,'-').replace(/ /g,'-'))}
              style={{ padding:'10px 16px',fontSize:12,fontWeight: selectedProjectTab===tab.toLowerCase().replace(/ & /g,'-').replace(/ /g,'-')?600:400,color: selectedProjectTab===tab.toLowerCase().replace(/ & /g,'-').replace(/ /g,'-')?COLORS.accent:COLORS.textSecondary,border:'none',background:'none',cursor:'pointer',borderBottom: selectedProjectTab===tab.toLowerCase().replace(/ & /g,'-').replace(/ /g,'-')?`2px solid ${COLORS.accent}`:'2px solid transparent',whiteSpace:'nowrap' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedProjectTab === 'overview' && (
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:20 }}>
              <h3 style={{ fontSize:14,fontWeight:600,margin:'0 0 12px' }}>Project Details</h3>
              <div style={{ fontSize:13,display:'flex',flexDirection:'column',gap:8 }}>
                {[['Code',project.code],['Client',getClient(project.clientId).name],['Type',project.type],['Stage',project.stage],['PM',getUser(project.pmId).name],['Superintendent',getUser(project.superintendentId).name],['Last Update',project.lastUpdate]].map(([k,v])=>(
                  <div key={k} style={{ display:'flex',justifyContent:'space-between' }}>
                    <span style={{ color:COLORS.textSecondary }}>{k}</span>
                    <span style={{ fontWeight:500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:20 }}>
              <h3 style={{ fontSize:14,fontWeight:600,margin:'0 0 12px' }}>Recent Activity</h3>
              {weeklyReports.filter(r=>r.projectId===project.id).slice(0,4).map(wr=>(
                <div key={wr.id} style={{ padding:'8px 0',borderBottom:`1px solid ${COLORS.borderLight}`,fontSize:12 }}>
                  <div style={{ display:'flex',justifyContent:'space-between',marginBottom:2 }}>
                    <span style={{ fontWeight:500 }}>{getNode(project.id,wr.nodeId)?.name||'General'}</span>
                    <span style={{ color:COLORS.textMuted }}>{wr.submittedDate}</span>
                  </div>
                  <div style={{ color:COLORS.textSecondary }}>{wr.summary}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedProjectTab === 'structure' && nodes.length > 0 && (
          <div style={{ display:'grid',gridTemplateColumns:'280px 1fr 280px',gap:16,minHeight:400 }}>
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:12 }}>
              <div style={{ fontSize:12,fontWeight:600,color:COLORS.textSecondary,marginBottom:10,padding:'0 8px' }}>PROJECT HIERARCHY</div>
              <TreeView nodes={nodes} selectedId={selectedNode} onSelect={setSelectedNode} projectId={project.id}/>
            </div>
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:20 }}>
              {selectedNode ? (() => {
                const node = nodes.find(n=>n.id===selectedNode);
                if(!node) return null;
                const nVar = node.actual-(node.baseline*node.progress/100);
                return (
                  <div>
                    <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16 }}>
                      <div>
                        <h3 style={{ fontSize:16,fontWeight:600,margin:0 }}>{node.name}</h3>
                        <div style={{ fontSize:12,color:COLORS.textSecondary,marginTop:4 }}>Code: {node.code} · Type: {node.type} · Responsible: {getUser(node.responsible).name}</div>
                      </div>
                      <StatusBadge status="In Progress"/>
                    </div>
                    <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:20 }}>
                      <div style={{ padding:12,background:'#FAFAF8',borderRadius:6 }}>
                        <div style={{ fontSize:11,color:COLORS.textSecondary }}>Baseline</div>
                        <div style={{ fontSize:16,fontWeight:700 }}>{fmt(node.baseline)}</div>
                      </div>
                      <div style={{ padding:12,background:'#FAFAF8',borderRadius:6 }}>
                        <div style={{ fontSize:11,color:COLORS.textSecondary }}>Actual</div>
                        <div style={{ fontSize:16,fontWeight:700 }}>{fmt(node.actual)}</div>
                      </div>
                      <div style={{ padding:12,background: nVar>0?COLORS.redLight:COLORS.greenLight,borderRadius:6 }}>
                        <div style={{ fontSize:11,color:COLORS.textSecondary }}>Variance</div>
                        <div style={{ fontSize:16,fontWeight:700,color: nVar>0?COLORS.red:COLORS.green }}>{fmt(nVar)}</div>
                      </div>
                    </div>
                    <ProgressBar value={node.progress} height={8}/>
                    <div style={{ fontSize:12,color:COLORS.textSecondary,marginTop:6 }}>Progress: {node.progress}%</div>
                    <div style={{ display:'flex',gap:8,marginTop:16,flexWrap:'wrap' }}>
                      <button onClick={()=>showToast('Opening estimate for node...')} style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'7px 14px',fontSize:12,cursor:'pointer',fontWeight:500 }}>Open Estimate</button>
                      <button onClick={()=>showToast('Creating material request...')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'7px 14px',fontSize:12,cursor:'pointer',fontWeight:500 }}>Create Material Request</button>
                      <button style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'7px 14px',fontSize:12,cursor:'pointer',fontWeight:500 }}>Add Child Node</button>
                    </div>
                  </div>
                );
              })() : (
                <div style={{ display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:COLORS.textMuted,fontSize:13 }}>
                  Select a node from the hierarchy
                </div>
              )}
            </div>
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:16 }}>
              <div style={{ fontSize:12,fontWeight:600,color:COLORS.textSecondary,marginBottom:12 }}>NODE SUMMARY</div>
              {selectedNode ? (() => {
                const node = nodes.find(n=>n.id===selectedNode);
                const nodeMR = materialRequests.filter(r=>r.projectId===project.id && r.nodeId===selectedNode);
                const nodeWR = weeklyReports.filter(r=>r.projectId===project.id && r.nodeId===selectedNode);
                return (
                  <div style={{ fontSize:12 }}>
                    <div style={{ fontWeight:600,marginBottom:8 }}>Materials</div>
                    <div style={{ color:COLORS.textSecondary,marginBottom:12 }}>{nodeMR.length} request(s)</div>
                    {nodeMR.slice(0,2).map(mr=>(
                      <div key={mr.id} style={{ padding:'6px 0',borderBottom:`1px solid ${COLORS.borderLight}` }}>
                        <div style={{ display:'flex',justifyContent:'space-between' }}>
                          <span style={{ fontWeight:500 }}>{mr.id}</span>
                          <StatusBadge status={mr.status} size="xs"/>
                        </div>
                      </div>
                    ))}
                    <div style={{ fontWeight:600,marginTop:16,marginBottom:8 }}>Weekly Reports</div>
                    {nodeWR.slice(0,2).map(wr=>(
                      <div key={wr.id} style={{ padding:'6px 0',borderBottom:`1px solid ${COLORS.borderLight}` }}>
                        <div style={{ fontWeight:500 }}>{wr.week}</div>
                        <div style={{ color:COLORS.textSecondary,fontSize:11 }}>{wr.summary.slice(0,50)}...</div>
                      </div>
                    ))}
                    <div style={{ fontWeight:600,marginTop:16,marginBottom:8 }}>Deliveries</div>
                    {deliveries.filter(d=>d.projectId===project.id && d.nodeId===selectedNode).slice(0,2).map(d=>(
                      <div key={d.id} style={{ padding:'6px 0',borderBottom:`1px solid ${COLORS.borderLight}` }}>
                        <div style={{ display:'flex',justifyContent:'space-between' }}>
                          <span style={{ fontWeight:500 }}>{d.id}</span>
                          <StatusBadge status={d.status} size="xs"/>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })() : <div style={{ color:COLORS.textMuted,fontSize:12 }}>Select a node</div>}
            </div>
          </div>
        )}

        {selectedProjectTab === 'budget-control' && (
          <div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:10,marginBottom:20 }}>
              <KpiCard label="Baseline Total" value={fmt(project.baseline)} icon={DollarSign}/>
              <KpiCard label="Actual Total" value={fmt(project.actual)} icon={TrendingUp} color={COLORS.green}/>
              <KpiCard label="Variance" value={fmt(project.actual-project.baseline*project.completion/100)} icon={AlertTriangle} color={COLORS.orange}/>
              <KpiCard label="Variance %" value={`${((project.actual/(project.baseline*project.completion/100)-1)*100).toFixed(1)}%`} icon={TrendingDown} color={COLORS.red}/>
            </div>
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
              <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
                <thead>
                  <tr style={{ background:'#FAFAF8' }}>
                    {['Node','Baseline','Actual','Variance','Var %','Progress','Status'].map(h=>(
                      <th key={h} style={{ textAlign:'left',padding:'10px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {nodes.filter(n=>n.level>=1).map(node=>{
                    const nVar = node.actual-(node.baseline*node.progress/100);
                    const nVarPct = node.baseline>0?((nVar/(node.baseline*node.progress/100))*100):0;
                    return (
                      <tr key={node.id} style={{ borderBottom:`1px solid ${COLORS.borderLight}`,cursor:'pointer' }}
                        onMouseEnter={e=>e.currentTarget.style.background='#FAFAF8'}
                        onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                        onClick={()=>{ setSelectedNode(node.id); setSelectedProjectTab('structure'); }}>
                        <td style={{ padding:'10px 12px',paddingLeft: 12+(node.level-1)*16 }}>
                          <span style={{ fontWeight:500 }}>{node.name}</span>
                          <span style={{ color:COLORS.textMuted,fontSize:10,marginLeft:6 }}>{node.code}</span>
                        </td>
                        <td style={{ padding:'10px 12px',textAlign:'right' }}>{fmt(node.baseline)}</td>
                        <td style={{ padding:'10px 12px',textAlign:'right' }}>{fmt(node.actual)}</td>
                        <td style={{ padding:'10px 12px',textAlign:'right',color: nVar>0?COLORS.red:COLORS.green,fontWeight:500 }}>{fmt(nVar)}</td>
                        <td style={{ padding:'10px 12px',textAlign:'right',color: nVarPct>5?COLORS.red:nVarPct>0?COLORS.orange:COLORS.green }}>{nVarPct.toFixed(1)}%</td>
                        <td style={{ padding:'10px 12px',width:80 }}><ProgressBar value={node.progress}/></td>
                        <td style={{ padding:'10px 12px' }}><StatusBadge status={nVarPct>10?'High':nVarPct>5?'Medium':'Low'} size="xs"/></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedProjectTab === 'materials' && (() => {
          const projMRs = materialRequests.filter(r=>r.projectId===project.id);
          const mr = projMRs.find(r=>r.id===selectedMR);
          return (
          <div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16 }}>
              <KpiCard label="Open Requests" value={projMRs.filter(r=>!['Fulfilled','Draft'].includes(r.status)).length} icon={Package}/>
              <KpiCard label="Urgent" value={projMRs.filter(r=>r.priority==='Urgent').length} icon={AlertTriangle} color={COLORS.red}/>
              <KpiCard label="Awaiting Approval" value={projMRs.filter(r=>r.status==='Pending Approval').length} icon={Clock} color={COLORS.orange}/>
              <KpiCard label="Fulfilled" value={projMRs.filter(r=>r.status==='Fulfilled').length} icon={Check} color={COLORS.green}/>
            </div>
            <div style={{ display:'grid',gridTemplateColumns: mr?'1fr 380px':'1fr',gap:16 }}>
              <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
                <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
                  <thead>
                    <tr style={{ background:'#FAFAF8' }}>
                      {['Request ID','Node','Requested By','Needed By','Priority','Status','Items','Source'].map(h=>(
                        <th key={h} style={{ textAlign:'left',padding:'10px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {projMRs.map(r=>(
                      <tr key={r.id} onClick={()=>setSelectedMR(r.id===selectedMR?null:r.id)}
                        style={{ borderBottom:`1px solid ${COLORS.borderLight}`,cursor:'pointer',background:selectedMR===r.id?COLORS.accentLight:'transparent',borderLeft:selectedMR===r.id?`3px solid ${COLORS.accent}`:'3px solid transparent' }}
                        onMouseEnter={e=>{if(selectedMR!==r.id) e.currentTarget.style.background='#FAFAF8';}}
                        onMouseLeave={e=>{if(selectedMR!==r.id) e.currentTarget.style.background='transparent';}}>
                        <td style={{ padding:'10px 12px',fontWeight:600,color:COLORS.accent }}>{r.id}</td>
                        <td style={{ padding:'10px 12px' }}>{getNode(project.id,r.nodeId)?.name||'—'}</td>
                        <td style={{ padding:'10px 12px',color:COLORS.textSecondary }}>{getUser(r.requestedBy).name.split(' ')[0]}</td>
                        <td style={{ padding:'10px 12px' }}>{r.neededBy}</td>
                        <td style={{ padding:'10px 12px' }}><StatusBadge status={r.priority} size="xs"/></td>
                        <td style={{ padding:'10px 12px' }}><StatusBadge status={r.status} size="xs"/></td>
                        <td style={{ padding:'10px 12px',textAlign:'center' }}>{r.itemCount}</td>
                        <td style={{ padding:'10px 12px',color:COLORS.textSecondary,fontSize:11 }}>{r.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {mr && (
                <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
                  <div style={{ padding:'14px 16px',borderBottom:`1px solid ${COLORS.border}`,background:'#FAFAF8' }}>
                    <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                      <span style={{ fontSize:15,fontWeight:700 }}>{mr.id}</span>
                      <button onClick={()=>setSelectedMR(null)} style={{ background:'none',border:'none',cursor:'pointer',padding:2 }}><X size={16} style={{ color:COLORS.textMuted }}/></button>
                    </div>
                    <div style={{ fontSize:12,color:COLORS.textSecondary,marginTop:4 }}>{getNode(project.id,mr.nodeId)?.name||'General'} · {mr.neededBy}</div>
                  </div>

                  <div style={{ padding:16 }}>
                    <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:14 }}>
                      {[['Status',mr.status],['Priority',mr.priority],['Requested By',getUser(mr.requestedBy).name],['Source',mr.source],['Created',mr.created],['Needed By',mr.neededBy]].map(([k,v])=>(
                        <div key={k} style={{ padding:'6px 10px',background:'#FAFAF8',borderRadius:4 }}>
                          <div style={{ fontSize:10,color:COLORS.textMuted }}>{k}</div>
                          <div style={{ fontSize:12,fontWeight:500 }}>{v}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ fontSize:12,fontWeight:600,marginBottom:8 }}>Line Items</div>
                    <div style={{ display:'flex',flexDirection:'column',gap:6,marginBottom:14 }}>
                      {(mr.items||[]).map((item,i)=>{
                        const fulfillPct = item.requestedQty>0 ? Math.round(item.fulfilledQty/item.requestedQty*100) : 0;
                        const shortage = item.requestedQty > item.availableQty;
                        return (
                          <div key={i} style={{ padding:'8px 10px',borderRadius:6,border:`1px solid ${shortage?COLORS.orange+'40':COLORS.border}`,background:shortage?COLORS.orangeLight:'white' }}>
                            <div style={{ fontSize:12,fontWeight:500,marginBottom:4 }}>{item.material}</div>
                            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:4,fontSize:10 }}>
                              <div><span style={{ color:COLORS.textMuted }}>Req:</span> <b>{item.requestedQty}</b> {item.unit}</div>
                              <div><span style={{ color:COLORS.textMuted }}>Avail:</span> <span style={{ color:shortage?COLORS.red:COLORS.green,fontWeight:600 }}>{item.availableQty}</span></div>
                              <div><span style={{ color:COLORS.textMuted }}>Appr:</span> {item.approvedQty||'—'}</div>
                              <div><span style={{ color:COLORS.textMuted }}>Filled:</span> {item.fulfilledQty||'—'}</div>
                            </div>
                            {fulfillPct > 0 && fulfillPct < 100 && <ProgressBar value={fulfillPct} height={3} color={COLORS.orange}/>}
                            {fulfillPct === 100 && <ProgressBar value={100} height={3} color={COLORS.green}/>}
                            {item.note && <div style={{ fontSize:10,color:COLORS.orange,marginTop:4,fontStyle:'italic' }}>{item.note}</div>}
                            {shortage && <div style={{ fontSize:10,color:COLORS.red,marginTop:2,fontWeight:600 }}>Shortage: {item.requestedQty - item.availableQty} {item.unit} need purchasing</div>}
                          </div>
                        );
                      })}
                    </div>

                    {mr.items?.some(i=>i.availableQty>0 && i.suggestedSource!=='Purchase') && (
                      <div style={{ padding:'8px 10px',background:'#F0FDF4',borderRadius:6,border:`1px solid ${COLORS.green}30`,marginBottom:12 }}>
                        <div style={{ fontSize:11,fontWeight:600,color:COLORS.green,marginBottom:2 }}>Smart Suggestion</div>
                        <div style={{ fontSize:11,color:COLORS.textSecondary }}>
                          {mr.nodeId==='n9' ? 'Apartment 201 already has surplus drywall screws — consider inter-node transfer' :
                           'All items can be fulfilled from central warehouse stock'}
                        </div>
                      </div>
                    )}

                    <div style={{ display:'flex',gap:6,flexWrap:'wrap' }}>
                      {['Pending Approval','Submitted'].includes(mr.status) && (
                        <button onClick={()=>showToast(`${mr.id} approved`)} style={{ background:COLORS.green,color:'white',border:'none',borderRadius:6,padding:'8px 14px',fontSize:12,cursor:'pointer',fontWeight:600,flex:1 }}>Approve</button>
                      )}
                      {['Approved'].includes(mr.status) && (
                        <button onClick={()=>showToast(`${mr.id} fulfillment started`)} style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 14px',fontSize:12,cursor:'pointer',fontWeight:600,flex:1 }}>Fulfill from Stock</button>
                      )}
                      {['Pending Approval','Submitted'].includes(mr.status) && (
                        <button onClick={()=>showToast(`${mr.id} rejected`)} style={{ background:'white',border:`1px solid ${COLORS.red}`,borderRadius:6,padding:'8px 14px',fontSize:12,cursor:'pointer',fontWeight:500,color:COLORS.red }}>Reject</button>
                      )}
                      <button onClick={()=>showToast('Opening in Bitrix...')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'8px 14px',fontSize:12,cursor:'pointer',fontWeight:500,display:'flex',alignItems:'center',gap:4 }}>
                        <ExternalLink size={12}/>Discuss
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          );
        })()}

        {selectedProjectTab === 'deliveries' && (() => {
          const projDels = deliveries.filter(d=>d.projectId===project.id);
          const del = projDels.find(d=>d.id===selectedDelivery);
          return (
          <div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16 }}>
              <KpiCard label="Total Deliveries" value={projDels.length} icon={Truck}/>
              <KpiCard label="Accepted" value={projDels.filter(d=>d.status==='Accepted').length} icon={Check} color={COLORS.green}/>
              <KpiCard label="With Discrepancy" value={projDels.filter(d=>d.discrepancy).length} icon={AlertTriangle} color={COLORS.orange}/>
              <KpiCard label="Pending Receipt" value={projDels.filter(d=>d.status==='Pending Receipt').length} icon={Clock} color={COLORS.accent}/>
            </div>
            <div style={{ display:'grid',gridTemplateColumns: del?'1fr 380px':'1fr',gap:16 }}>
              <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
                <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
                  <thead>
                    <tr style={{ background:'#FAFAF8' }}>
                      {['Delivery ID','Source','Node','Expected','Received','Accepted By','Status','Discrepancy'].map(h=>(
                        <th key={h} style={{ textAlign:'left',padding:'10px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {projDels.map(d=>(
                      <tr key={d.id} onClick={()=>setSelectedDelivery(d.id===selectedDelivery?null:d.id)}
                        style={{ borderBottom:`1px solid ${COLORS.borderLight}`,cursor:'pointer',background:selectedDelivery===d.id?COLORS.accentLight:'transparent',borderLeft:selectedDelivery===d.id?`3px solid ${COLORS.accent}`:'3px solid transparent' }}
                        onMouseEnter={e=>{if(selectedDelivery!==d.id) e.currentTarget.style.background='#FAFAF8';}}
                        onMouseLeave={e=>{if(selectedDelivery!==d.id) e.currentTarget.style.background='transparent';}}>
                        <td style={{ padding:'10px 12px',fontWeight:600,color:COLORS.accent }}>{d.id}</td>
                        <td style={{ padding:'10px 12px' }}>{d.source}</td>
                        <td style={{ padding:'10px 12px' }}>{getNode(project.id,d.nodeId)?.name||'—'}</td>
                        <td style={{ padding:'10px 12px' }}>{d.expectedDate}</td>
                        <td style={{ padding:'10px 12px' }}>{d.receivedDate||'—'}</td>
                        <td style={{ padding:'10px 12px',color:COLORS.textSecondary }}>{d.acceptedBy?getUser(d.acceptedBy).name.split(' ')[0]:'—'}</td>
                        <td style={{ padding:'10px 12px' }}><StatusBadge status={d.status} size="xs"/></td>
                        <td style={{ padding:'10px 12px' }}>{d.discrepancy?<span style={{ color:COLORS.orange,fontWeight:500 }}>Yes</span>:'—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {del && (
                <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
                  <div style={{ padding:'14px 16px',borderBottom:`1px solid ${COLORS.border}`,background: del.discrepancy?COLORS.orangeLight:'#FAFAF8' }}>
                    <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                      <span style={{ fontSize:15,fontWeight:700 }}>{del.id}</span>
                      <button onClick={()=>setSelectedDelivery(null)} style={{ background:'none',border:'none',cursor:'pointer',padding:2 }}><X size={16} style={{ color:COLORS.textMuted }}/></button>
                    </div>
                    <div style={{ fontSize:12,color:COLORS.textSecondary,marginTop:4 }}>{del.source} → {getNode(project.id,del.nodeId)?.name||'Site'}</div>
                  </div>

                  <div style={{ padding:16 }}>
                    <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:14 }}>
                      {[['Status',del.status],['Expected',del.expectedDate],['Received',del.receivedDate||'Pending'],['Accepted By',del.acceptedBy?getUser(del.acceptedBy).name:'—'],['Supplier',del.source],['Linked MR',del.linkedMR||'—']].map(([k,v])=>(
                        <div key={k} style={{ padding:'6px 10px',background:'#FAFAF8',borderRadius:4 }}>
                          <div style={{ fontSize:10,color:COLORS.textMuted }}>{k}</div>
                          <div style={{ fontSize:12,fontWeight:500,color:k==='Linked MR'&&v!=='—'?COLORS.accent:COLORS.text }}>{v}</div>
                        </div>
                      ))}
                    </div>

                    {del.discrepancy && del.discrepancyNote && (
                      <div style={{ padding:'8px 10px',background:COLORS.orangeLight,borderRadius:6,border:`1px solid ${COLORS.orange}30`,marginBottom:12 }}>
                        <div style={{ fontSize:11,fontWeight:600,color:COLORS.orange,marginBottom:2 }}>Discrepancy Note</div>
                        <div style={{ fontSize:11 }}>{del.discrepancyNote}</div>
                      </div>
                    )}

                    <div style={{ fontSize:12,fontWeight:600,marginBottom:8 }}>Delivered Items</div>
                    <div style={{ display:'flex',flexDirection:'column',gap:6,marginBottom:14 }}>
                      {(del.items||[]).map((item,i)=>{
                        const condColor = { OK: COLORS.green, Damaged: COLORS.red, Incomplete: COLORS.orange, 'Wrong Item': COLORS.red };
                        const hasIssue = item.condition && item.condition !== 'OK';
                        return (
                          <div key={i} style={{ padding:'8px 10px',borderRadius:6,border:`1px solid ${hasIssue?COLORS.orange+'40':COLORS.border}`,background:hasIssue?COLORS.orangeLight:'white' }}>
                            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4 }}>
                              <span style={{ fontSize:12,fontWeight:500 }}>{item.material}</span>
                              {item.condition && (
                                <span style={{ fontSize:9,fontWeight:600,padding:'1px 6px',borderRadius:3,background:hasIssue?COLORS.orangeLight:COLORS.greenLight,color:condColor[item.condition]||COLORS.textMuted }}>
                                  {item.condition}
                                </span>
                              )}
                            </div>
                            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:4,fontSize:10 }}>
                              <div><span style={{ color:COLORS.textMuted }}>Expected:</span> <b>{item.expected}</b></div>
                              <div><span style={{ color:COLORS.textMuted }}>Received:</span> <b style={{ color:item.received<item.expected?COLORS.red:COLORS.green }}>{item.received||'—'}</b></div>
                            </div>
                            {item.note && <div style={{ fontSize:10,color:COLORS.orange,marginTop:4,fontStyle:'italic' }}>{item.note}</div>}
                          </div>
                        );
                      })}
                    </div>

                    {(del.photos||[]).length > 0 && (
                      <div style={{ marginBottom:14 }}>
                        <div style={{ fontSize:12,fontWeight:600,marginBottom:8 }}>Proof Photos ({del.photos.length})</div>
                        <div style={{ display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:6 }}>
                          {del.photos.map(ph => {
                            const tagColors = { Damage:'#DC2626', Verification:'#2563EB', Documentation:'#7C3AED', Storage:'#16A34A', Unloading:'#CA8A04' };
                            const bgGradients = { Damage:'linear-gradient(135deg,#FEE2E2 0%,#FECACA 100%)', Verification:'linear-gradient(135deg,#DBEAFE 0%,#BFDBFE 100%)', Documentation:'linear-gradient(135deg,#EDE9FE 0%,#DDD6FE 100%)', Storage:'linear-gradient(135deg,#D1FAE5 0%,#A7F3D0 100%)', Unloading:'linear-gradient(135deg,#FEF3C7 0%,#FDE68A 100%)' };
                            const icons = { Damage: AlertTriangle, Verification: Check, Documentation: FileText, Storage: Package, Unloading: Truck };
                            const IconComp = icons[ph.tag] || Camera;
                            return (
                              <div key={ph.id} style={{ borderRadius:6,overflow:'hidden',border:`1px solid ${COLORS.border}`,cursor:'pointer',transition:'box-shadow 0.15s' }}
                                onMouseEnter={e=>e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'}
                                onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
                                <div style={{ height:72,background:bgGradients[ph.tag]||'linear-gradient(135deg,#E2E0DB 0%,#D1CFC9 100%)',display:'flex',alignItems:'center',justifyContent:'center',position:'relative' }}>
                                  <IconComp size={20} style={{ color:tagColors[ph.tag]||COLORS.textMuted,opacity:0.7 }}/>
                                  <div style={{ position:'absolute',top:4,right:4,fontSize:9,color:COLORS.textMuted,background:'rgba(255,255,255,0.8)',padding:'1px 5px',borderRadius:3 }}>{ph.time}</div>
                                </div>
                                <div style={{ padding:'6px 8px' }}>
                                  <div style={{ fontSize:10,fontWeight:500,lineHeight:1.3,marginBottom:3,overflow:'hidden',textOverflow:'ellipsis',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical' }}>{ph.caption}</div>
                                  <span style={{ fontSize:8,fontWeight:700,padding:'1px 5px',borderRadius:3,background:tagColors[ph.tag]?tagColors[ph.tag]+'18':'#F3F4F6',color:tagColors[ph.tag]||COLORS.textMuted,textTransform:'uppercase',letterSpacing:'0.03em' }}>{ph.tag}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {del.status === 'Pending Receipt' && (
                          <button onClick={()=>showToast('Camera opened — take delivery photo')} style={{ width:'100%',marginTop:8,background:'white',border:`1px dashed ${COLORS.border}`,borderRadius:6,padding:'10px',fontSize:12,cursor:'pointer',color:COLORS.textSecondary,display:'flex',alignItems:'center',justifyContent:'center',gap:6 }}>
                            <Camera size={14}/>Add Photo
                          </button>
                        )}
                      </div>
                    )}

                    {(del.photos||[]).length === 0 && del.status === 'Pending Receipt' && (
                      <div style={{ marginBottom:14 }}>
                        <div style={{ fontSize:12,fontWeight:600,marginBottom:8 }}>Proof Photos</div>
                        <button onClick={()=>showToast('Camera opened — take delivery photo')} style={{ width:'100%',background:'white',border:`1px dashed ${COLORS.border}`,borderRadius:6,padding:'16px',fontSize:12,cursor:'pointer',color:COLORS.textSecondary,display:'flex',flexDirection:'column',alignItems:'center',gap:6 }}>
                          <Camera size={20}/>
                          <span>Take photos when delivery arrives</span>
                          <span style={{ fontSize:10,color:COLORS.textMuted }}>Document unloading, verify quantities, record any damage</span>
                        </button>
                      </div>
                    )}

                    <div style={{ display:'flex',gap:6,flexWrap:'wrap' }}>
                      {del.status==='Pending Receipt' && (
                        <>
                          <button onClick={()=>showToast(`${del.id} accepted`)} style={{ background:COLORS.green,color:'white',border:'none',borderRadius:6,padding:'8px 14px',fontSize:12,cursor:'pointer',fontWeight:600,flex:1 }}>Accept Delivery</button>
                          <button onClick={()=>showToast(`${del.id} accepted with discrepancy`)} style={{ background:COLORS.orange,color:'white',border:'none',borderRadius:6,padding:'8px 14px',fontSize:12,cursor:'pointer',fontWeight:500 }}>Accept with Issue</button>
                          <button onClick={()=>showToast(`${del.id} rejected`)} style={{ background:'white',border:`1px solid ${COLORS.red}`,borderRadius:6,padding:'8px 14px',fontSize:12,cursor:'pointer',fontWeight:500,color:COLORS.red }}>Reject</button>
                        </>
                      )}
                      {del.discrepancy && (
                        <button onClick={()=>showToast('Exception approval created')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'8px 14px',fontSize:12,cursor:'pointer',fontWeight:500 }}>Request Exception Approval</button>
                      )}
                      <button onClick={()=>showToast('Opening in Bitrix...')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'8px 14px',fontSize:12,cursor:'pointer',fontWeight:500,display:'flex',alignItems:'center',gap:4 }}>
                        <ExternalLink size={12}/>Discuss
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          );
        })()}

        {selectedProjectTab === 'progress' && (
          <div>
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
              <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
                <thead>
                  <tr style={{ background:'#FAFAF8' }}>
                    {['Week','Node','Submitted By','Date','Progress','Photos','Blocker','Summary'].map(h=>(
                      <th key={h} style={{ textAlign:'left',padding:'10px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {weeklyReports.filter(r=>r.projectId===project.id).map(wr=>(
                    <tr key={wr.id} style={{ borderBottom:`1px solid ${COLORS.borderLight}` }}>
                      <td style={{ padding:'10px 12px',fontWeight:600 }}>{wr.week}</td>
                      <td style={{ padding:'10px 12px' }}>{getNode(project.id,wr.nodeId)?.name||'General'}</td>
                      <td style={{ padding:'10px 12px',color:COLORS.textSecondary }}>{getUser(wr.submittedBy).name.split(' ')[0]}</td>
                      <td style={{ padding:'10px 12px' }}>{wr.submittedDate}</td>
                      <td style={{ padding:'10px 12px',width:60 }}><ProgressBar value={wr.progress}/></td>
                      <td style={{ padding:'10px 12px' }}><span style={{ display:'flex',alignItems:'center',gap:4 }}><Camera size={12}/>{wr.photoCount}</span></td>
                      <td style={{ padding:'10px 12px' }}>{wr.blockerFlag?<span style={{ color:COLORS.red,fontWeight:600,fontSize:10 }}>BLOCKER</span>:'—'}</td>
                      <td style={{ padding:'10px 12px',color:COLORS.textSecondary,maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{wr.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedProjectTab === 'labor' && (
          <div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16 }}>
              <KpiCard label="Total Hours (Week)" value={laborEntries.filter(e=>e.projectId===project.id).reduce((s,e)=>s+e.hours,0)} icon={Clock}/>
              <KpiCard label="Employees" value={laborEntries.filter(e=>e.projectId===project.id&&e.workerType==='Employee').length} icon={Users} color={COLORS.accent}/>
              <KpiCard label="Subcontractors" value={laborEntries.filter(e=>e.projectId===project.id&&e.workerType==='Subcontractor').length} icon={Wrench} color={COLORS.purple}/>
              <KpiCard label="Avg Output" value={`${(laborEntries.filter(e=>e.projectId===project.id).reduce((s,e)=>s+e.outputQty,0)/Math.max(laborEntries.filter(e=>e.projectId===project.id).length,1)).toFixed(1)}`} icon={Zap} color={COLORS.green}/>
            </div>
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
              <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
                <thead>
                  <tr style={{ background:'#FAFAF8' }}>
                    {['Date','Node','Worker','Type','Activity','Hours','Output','Unit'].map(h=>(
                      <th key={h} style={{ textAlign:'left',padding:'10px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {laborEntries.filter(e=>e.projectId===project.id).slice(0,20).map(le=>(
                    <tr key={le.id} style={{ borderBottom:`1px solid ${COLORS.borderLight}` }}>
                      <td style={{ padding:'10px 12px' }}>{le.date}</td>
                      <td style={{ padding:'10px 12px' }}>{getNode(project.id,le.nodeId)?.name||'—'}</td>
                      <td style={{ padding:'10px 12px',fontWeight:500 }}>{le.worker}</td>
                      <td style={{ padding:'10px 12px' }}><StatusBadge status={le.workerType==='Employee'?'Normal':'Submitted'} size="xs"/></td>
                      <td style={{ padding:'10px 12px',color:COLORS.textSecondary }}>{le.activity}</td>
                      <td style={{ padding:'10px 12px',fontWeight:600 }}>{le.hours}h</td>
                      <td style={{ padding:'10px 12px',fontWeight:500 }}>{le.outputQty}</td>
                      <td style={{ padding:'10px 12px',color:COLORS.textMuted }}>{le.outputUnit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedProjectTab === 'estimate' && (
          <div style={{ textAlign:'center',padding:40,color:COLORS.textSecondary }}>
            <Calculator size={40} style={{ color:COLORS.textMuted,marginBottom:12 }}/>
            <div style={{ fontSize:14,fontWeight:500,marginBottom:8 }}>Estimate Builder</div>
            <div style={{ fontSize:12,marginBottom:16 }}>Open the full estimate builder from the Estimates section</div>
            <button onClick={()=>setCurrentPage('estimates')} style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 16px',fontSize:13,cursor:'pointer',fontWeight:500 }}>Go to Estimates</button>
          </div>
        )}

        {selectedProjectTab === 'files-&-links' && (
          <div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:20 }}>
              {[
                { title: 'Open Bitrix Project Workspace', sub: 'CRM, collaboration, project files', icon: ExternalLink },
                { title: 'Open Client Collab', sub: 'Shared workspace with client stakeholders', icon: Users },
                { title: 'Open Shared Folder', sub: 'Drawings, specs, contracts', icon: FolderTree },
              ].map(item=>(
                <div key={item.title} onClick={()=>showToast('Opening external workspace...')}
                  style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:20,cursor:'pointer',textAlign:'center',transition:'box-shadow 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
                  <item.icon size={24} style={{ color:COLORS.accent,marginBottom:8 }}/>
                  <div style={{ fontSize:13,fontWeight:600,marginBottom:4 }}>{item.title}</div>
                  <div style={{ fontSize:11,color:COLORS.textSecondary }}>{item.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:20 }}>
              <h3 style={{ fontSize:14,fontWeight:600,margin:'0 0 12px' }}>Key Project Documents</h3>
              {['Contract_BRG-24021_signed.pdf','BOQ_Riverside_v3.xlsx','Floor_Plans_BlockB.dwg','Specification_Interior.docx','Client_Approval_Design.pdf'].map(f=>(
                <div key={f} style={{ padding:'8px 12px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:`1px solid ${COLORS.borderLight}` }}>
                  <div style={{ display:'flex',alignItems:'center',gap:8,fontSize:12 }}>
                    <FileText size={14} style={{ color:COLORS.textMuted }}/>
                    <span style={{ fontWeight:500 }}>{f}</span>
                  </div>
                  <button onClick={()=>showToast('Opening file in Bitrix...')} style={{ background:'none',border:'none',color:COLORS.accent,fontSize:11,cursor:'pointer',display:'flex',alignItems:'center',gap:4 }}>
                    <ExternalLink size={11}/>Open in Bitrix
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedProjectTab === 'approvals' && (
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
            <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
              <thead>
                <tr style={{ background:'#FAFAF8' }}>
                  {['ID','Type','Description','Amount','Submitted','Priority','Status'].map(h=>(
                    <th key={h} style={{ textAlign:'left',padding:'10px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {approvals.filter(a=>a.projectId===project.id).map(a=>(
                  <tr key={a.id} style={{ borderBottom:`1px solid ${COLORS.borderLight}` }}>
                    <td style={{ padding:'10px 12px',fontWeight:600 }}>{a.id}</td>
                    <td style={{ padding:'10px 12px' }}>{a.type}</td>
                    <td style={{ padding:'10px 12px',color:COLORS.textSecondary,maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{a.description}</td>
                    <td style={{ padding:'10px 12px',fontWeight:500 }}>{fmt(a.amount)}</td>
                    <td style={{ padding:'10px 12px' }}>{a.submitted}</td>
                    <td style={{ padding:'10px 12px' }}><StatusBadge status={a.priority} size="xs"/></td>
                    <td style={{ padding:'10px 12px' }}><StatusBadge status={a.status} size="xs"/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // ============================================================
  // PAGE: Estimates (Enhanced)
  // ============================================================
  const EstimatesPage = () => {
    const [selectedEV, setSelectedEV] = useState(null);
    const [builderTab, setBuilderTab] = useState('builder'); // builder | compare | templates
    const [selectedBuildNode, setSelectedBuildNode] = useState(null);
    const [nodeScope, setNodeScope] = useState('node'); // node | children | all
    const [viewMode, setViewMode] = useState('internal'); // internal | client
    const [showTemplateDrawer, setShowTemplateDrawer] = useState(false);
    const [activeTemplate, setActiveTemplate] = useState(null);
    const [templateInputs, setTemplateInputs] = useState({});
    const [rightPanel, setRightPanel] = useState('summary'); // summary | templates | materials | prices
    const [showChangedOnly, setShowChangedOnly] = useState(false);

    const ev = selectedEV ? estimateVersions.find(e=>e.id===selectedEV) : null;
    const proj = ev ? getProject(ev.projectId) : null;
    const nodes = proj ? (projectNodes[proj.id] || []) : [];

    // Compute filtered lines
    const filteredLines = useMemo(() => {
      if (!ev) return [];
      let lines = estimateLinesFull.filter(l=>l.evId===ev.id);
      if (selectedBuildNode) {
        if (nodeScope === 'node') {
          lines = lines.filter(l=>l.nodeId===selectedBuildNode);
        } else if (nodeScope === 'children') {
          const childIds = nodes.filter(n=>n.parentId===selectedBuildNode).map(n=>n.id);
          lines = lines.filter(l=>l.nodeId===selectedBuildNode || childIds.includes(l.nodeId));
        }
      }
      if (showChangedOnly) lines = lines.filter(l=>l.changed);
      return lines;
    }, [selectedBuildNode, nodeScope, showChangedOnly, nodes, ev]);

    // Compute totals
    const totals = useMemo(() => {
      const tc = filteredLines.reduce((s,l)=>s+l.qty*l.uc, 0);
      const ts = filteredLines.reduce((s,l)=>s+l.qty*l.us, 0);
      const lh = filteredLines.reduce((s,l)=>s+l.lh, 0);
      const mc = filteredLines.filter(l=>l.type==='Material').reduce((s,l)=>s+l.qty*l.uc, 0);
      const lc = filteredLines.filter(l=>l.type==='Labor').reduce((s,l)=>s+l.qty*l.uc, 0);
      const sc = filteredLines.filter(l=>l.type==='Subcontract').reduce((s,l)=>s+l.qty*l.uc, 0);
      return { tc, ts, margin: ts>0?((ts-tc)/ts*100):0, lh, mc, lc, sc };
    }, [filteredLines]);

    // Top cost drivers
    const topDrivers = useMemo(() => {
      return [...filteredLines].sort((a,b)=>(b.qty*b.uc)-(a.qty*a.uc)).slice(0,5);
    }, [filteredLines]);

    // Breakdown by category
    const categoryBreakdown = useMemo(() => {
      const map = {};
      filteredLines.forEach(l => {
        if (!map[l.type]) map[l.type] = { cost: 0, sales: 0, count: 0 };
        map[l.type].cost += l.qty * l.uc;
        map[l.type].sales += l.qty * l.us;
        map[l.type].count++;
      });
      return Object.entries(map).map(([k,v])=>({ name:k, ...v }));
    }, [filteredLines]);

    const selectedNodeData = selectedBuildNode ? nodes.find(n=>n.id===selectedBuildNode) : null;

    // Cost source label
    const srcLabel = (src) => ({ catalog:'Catalog', last_purchase:'Last Purchase', manual:'Manual', norm:'Labor Norm', supplier_quote:'Supplier Quote', estimated:'Estimated' }[src] || src);
    const srcColor = (src) => ({ catalog:'#6B7280', last_purchase:'#2563EB', manual:'#7C3AED', norm:'#6B7280', supplier_quote:'#16A34A', estimated:'#EA580C' }[src] || '#6B7280');

    // Procurement badge
    const procBadge = (status) => {
      if (!status) return null;
      const map = { 'In Stock': { bg:'#D1FAE5', color:'#065F46' }, 'Low Stock': { bg:'#FEF3C7', color:'#92400E' }, 'Purchase Required': { bg:'#FEE2E2', color:'#991B1B' } };
      const s = map[status] || { bg:'#F3F4F6', color:'#6B7280' };
      return <span style={{ fontSize:9,fontWeight:600,padding:'1px 5px',borderRadius:3,background:s.bg,color:s.color }}>{status}</span>;
    };

    // Template apply calculations
    const computeTemplate = (tmpl, inputs) => {
      const vals = {};
      tmpl.inputs.forEach(inp => { vals[inp.key] = parseFloat(inputs[inp.key]) || inp.default; });
      const area = (vals.length_m||0) * (vals.height_m||0) || vals.area_sqm || ((vals.floor_sqm||0) + (vals.wall_sqm||0));
      const length = vals.length_m || 0;
      const wall = vals.wall_sqm || 0;
      const total = (vals.floor_sqm||0) + (vals.wall_sqm||0);
      const results = tmpl.outputs.map(out => {
        let qty = 0;
        try { qty = eval(out.formula.replace(/area/g, area).replace(/length/g, length).replace(/wall/g, wall).replace(/total/g, total)); } catch(e) { qty = 0; }
        qty = Math.ceil(qty * (1 + (out.waste||0)/100));
        const mat = out.materialId ? getMaterial(out.materialId) : null;
        return { ...out, qty, cost: mat ? mat.cost : 0, materialName: mat?.name || out.label };
      });
      let laborHrs = 0;
      try { laborHrs = eval(tmpl.laborFormula.replace(/area/g, area).replace(/length/g, length).replace(/wall/g, wall).replace(/total/g, total)); } catch(e) {}
      return { results, laborHrs: Math.ceil(laborHrs), laborCost: Math.ceil(laborHrs) * tmpl.laborRate };
    };

    // ---- VERSION LIST (no builder open) ----
    if (!selectedEV) {
      return (
        <div>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20 }}>
            <div>
              <h1 style={{ fontSize:22,fontWeight:700,color:COLORS.text,margin:0 }}>Estimates</h1>
              <p style={{ fontSize:13,color:COLORS.textSecondary,margin:'4px 0 0' }}>{estimateVersions.length} estimate versions across {new Set(estimateVersions.map(e=>e.projectId)).size} projects</p>
            </div>
            <button style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 16px',fontSize:13,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:6 }}>
              <Plus size={14}/>New Estimate
            </button>
          </div>

          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
            <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
              <thead>
                <tr style={{ background:'#FAFAF8' }}>
                  {['Version','Project','Revision','Status','Prepared By','Submitted','Total Cost','Total Sales','Margin %',''].map(h=>(
                    <th key={h} style={{ textAlign:'left',padding:'10px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {estimateVersions.map(ev=>(
                  <tr key={ev.id} onClick={()=>{setSelectedEV(ev.id);setBuilderTab('builder');setSelectedBuildNode(null);}}
                    style={{ borderBottom:`1px solid ${COLORS.borderLight}`,cursor:'pointer' }}
                    onMouseEnter={e=>e.currentTarget.style.background='#FAFAF8'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <td style={{ padding:'10px 12px',fontWeight:600 }}>v{ev.version}</td>
                    <td style={{ padding:'10px 12px',fontWeight:500,color:COLORS.accent }}>{getProject(ev.projectId)?.code}</td>
                    <td style={{ padding:'10px 12px',color:COLORS.textSecondary }}>{ev.revision}</td>
                    <td style={{ padding:'10px 12px' }}><StatusBadge status={ev.status} size="xs"/></td>
                    <td style={{ padding:'10px 12px',color:COLORS.textSecondary }}>{getUser(ev.preparedBy).name.split(' ')[0]}</td>
                    <td style={{ padding:'10px 12px' }}>{ev.submitted}</td>
                    <td style={{ padding:'10px 12px',textAlign:'right',fontWeight:500 }}>{fmt(ev.totalCost)}</td>
                    <td style={{ padding:'10px 12px',textAlign:'right',fontWeight:500 }}>{fmt(ev.totalSales)}</td>
                    <td style={{ padding:'10px 12px',textAlign:'right',fontWeight:600,color:COLORS.green }}>{ev.margin}%</td>
                    <td style={{ padding:'10px 12px' }}>
                      <div style={{ display:'flex',gap:4 }}>
                        <button onClick={e=>{e.stopPropagation();showToast('Estimate duplicated');}} style={{ background:'none',border:`1px solid ${COLORS.border}`,borderRadius:4,padding:'4px 6px',cursor:'pointer' }} title="Duplicate"><Copy size={12}/></button>
                        {ev.status!=='Approved'&&<button onClick={e=>{e.stopPropagation();showToast('Submitted for approval');}} style={{ background:COLORS.accent,border:'none',borderRadius:4,padding:'4px 6px',cursor:'pointer',color:'white' }} title="Submit"><Send size={12}/></button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // ---- BUILDER OPEN ----
    return (
      <div>
        {/* Builder Header */}
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16 }}>
          <div>
            <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:4 }}>
              <span style={{ fontSize:12,color:COLORS.accent,cursor:'pointer',fontWeight:500 }} onClick={()=>setSelectedEV(null)}>← Estimates</span>
              <ChevronRight size={12} style={{ color:COLORS.textMuted }}/>
              <span style={{ fontSize:12,fontWeight:600 }}>{proj?.code} v{ev.version}</span>
              <StatusBadge status={ev.status} size="xs"/>
            </div>
            <h1 style={{ fontSize:20,fontWeight:700,color:COLORS.text,margin:0 }}>Estimate Builder</h1>
            <div style={{ fontSize:12,color:COLORS.textSecondary,marginTop:2 }}>{ev.revision} · Prepared by {getUser(ev.preparedBy).name} · {ev.submitted}</div>
          </div>
          <div style={{ display:'flex',gap:6,flexWrap:'wrap' }}>
            <button onClick={()=>showToast('Draft saved')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'7px 12px',fontSize:12,cursor:'pointer',fontWeight:500,display:'flex',alignItems:'center',gap:4 }}><Save size={13}/>Save</button>
            <button onClick={()=>showToast('Line added')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'7px 12px',fontSize:12,cursor:'pointer',fontWeight:500,display:'flex',alignItems:'center',gap:4 }}><Plus size={13}/>Add Line</button>
            <button onClick={()=>showToast('Recalculated')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'7px 12px',fontSize:12,cursor:'pointer',fontWeight:500,display:'flex',alignItems:'center',gap:4 }}><RefreshCw size={13}/>Recalc</button>
            <div style={{ width:1,background:COLORS.border,margin:'0 2px' }}/>
            <button onClick={()=>setViewMode(viewMode==='internal'?'client':'internal')}
              style={{ background: viewMode==='client'?'#EDE9FE':'white',border:`1px solid ${viewMode==='client'?'#7C3AED':COLORS.border}`,borderRadius:6,padding:'7px 12px',fontSize:12,cursor:'pointer',fontWeight:500,display:'flex',alignItems:'center',gap:4,color: viewMode==='client'?'#7C3AED':COLORS.text }}>
              <Eye size={13}/>{viewMode==='client'?'Client View':'Internal View'}
            </button>
            <button onClick={()=>showToast('Submitted for approval')} style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'7px 12px',fontSize:12,cursor:'pointer',fontWeight:600,display:'flex',alignItems:'center',gap:4 }}><Send size={13}/>Submit</button>
          </div>
        </div>

        {/* Mode tabs */}
        <div style={{ display:'flex',gap:0,marginBottom:16,borderBottom:`1px solid ${COLORS.border}` }}>
          {[{id:'builder',label:'Estimate Builder',icon:Calculator},{id:'compare',label:'Compare Versions',icon:Copy},{id:'templates',label:'Template Library',icon:Layers}].map(tab=>(
            <button key={tab.id} onClick={()=>setBuilderTab(tab.id)}
              style={{ padding:'9px 16px',fontSize:12,fontWeight:builderTab===tab.id?600:400,color:builderTab===tab.id?COLORS.accent:COLORS.textSecondary,border:'none',background:'none',cursor:'pointer',borderBottom:builderTab===tab.id?`2px solid ${COLORS.accent}`:'2px solid transparent',display:'flex',alignItems:'center',gap:5 }}>
              <tab.icon size={14}/>{tab.label}
            </button>
          ))}
        </div>

        {/* =================== BUILDER TAB =================== */}
        {builderTab === 'builder' && (
          <div style={{ display:'grid',gridTemplateColumns:'220px 1fr 260px',gap:12,minHeight:500 }}>
            {/* LEFT: Node Tree */}
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:10,overflow:'auto',maxHeight:700 }}>
              <div style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,letterSpacing:'0.05em',marginBottom:8,padding:'0 6px' }}>AREA HIERARCHY</div>
              <div onClick={()=>{setSelectedBuildNode(null);setNodeScope('all');}}
                style={{ padding:'6px 8px',borderRadius:4,fontSize:12,cursor:'pointer',fontWeight:!selectedBuildNode?600:400,background:!selectedBuildNode?COLORS.accentLight:'transparent',color:!selectedBuildNode?COLORS.accent:COLORS.textSecondary,marginBottom:4 }}>
                All Areas ({ev ? estimateLinesFull.filter(l=>l.evId===ev.id).length : 0} lines)
              </div>
              {nodes.length > 0 && <TreeView nodes={nodes} selectedId={selectedBuildNode} onSelect={(id)=>{setSelectedBuildNode(id);setNodeScope('node');}} projectId={proj.id}/>}
              {/* Scope switcher */}
              {selectedBuildNode && (
                <div style={{ marginTop:10,padding:'8px 6px',borderTop:`1px solid ${COLORS.borderLight}` }}>
                  <div style={{ fontSize:10,color:COLORS.textMuted,marginBottom:4 }}>SCOPE</div>
                  {['node','children','all'].map(sc=>(
                    <label key={sc} style={{ display:'flex',alignItems:'center',gap:4,fontSize:11,cursor:'pointer',padding:'2px 0',color: nodeScope===sc?COLORS.accent:COLORS.text }}>
                      <input type="radio" name="scope" checked={nodeScope===sc} onChange={()=>setNodeScope(sc)} style={{ accentColor:COLORS.accent,width:12,height:12 }}/>
                      {sc==='node'?'This node only':sc==='children'?'Node + children':'Entire project'}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* CENTER: Estimate Grid */}
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden',display:'flex',flexDirection:'column' }}>
              {/* Node summary header */}
              {selectedNodeData && (
                <div style={{ padding:'10px 14px',borderBottom:`1px solid ${COLORS.border}`,background:'#FAFAF8',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                  <div>
                    <span style={{ fontSize:13,fontWeight:600 }}>{selectedNodeData.name}</span>
                    <span style={{ fontSize:11,color:COLORS.textMuted,marginLeft:8 }}>{selectedNodeData.code} · {selectedNodeData.type}</span>
                  </div>
                  <div style={{ display:'flex',gap:12,fontSize:11 }}>
                    <span>Baseline: <b>{fmt(selectedNodeData.baseline)}</b></span>
                    <span>Actual: <b>{fmt(selectedNodeData.actual)}</b></span>
                    <span>Progress: <b>{selectedNodeData.progress}%</b></span>
                  </div>
                </div>
              )}
              {/* Filter bar */}
              <div style={{ padding:'8px 14px',borderBottom:`1px solid ${COLORS.borderLight}`,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                <div style={{ fontSize:11,color:COLORS.textSecondary }}>{filteredLines.length} lines · {viewMode==='client'?'Client offer view':'Internal costing view'}</div>
                <div style={{ display:'flex',gap:8,alignItems:'center' }}>
                  <label style={{ display:'flex',alignItems:'center',gap:4,fontSize:11,cursor:'pointer' }}>
                    <input type="checkbox" checked={showChangedOnly} onChange={e=>setShowChangedOnly(e.target.checked)} style={{ accentColor:COLORS.accent,width:12,height:12 }}/>
                    Changed only
                  </label>
                  <button onClick={()=>setShowTemplateDrawer(true)} style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:4,padding:'4px 10px',fontSize:11,cursor:'pointer',fontWeight:500,display:'flex',alignItems:'center',gap:3 }}><Zap size={11}/>Apply Template</button>
                </div>
              </div>
              {/* Grid */}
              <div style={{ flex:1,overflow:'auto' }}>
                <table style={{ width:'100%',borderCollapse:'collapse',fontSize:11,minWidth: viewMode==='internal'?1100:700 }}>
                  <thead style={{ position:'sticky',top:0,zIndex:2 }}>
                    <tr style={{ background:'#FAFAF8' }}>
                      <th style={{ padding:'7px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,width:28 }}>#</th>
                      {!selectedBuildNode && <th style={{ padding:'7px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,width:90 }}>Node</th>}
                      <th style={{ padding:'7px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,width:60 }}>Type</th>
                      <th style={{ padding:'7px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,minWidth:140 }}>Description</th>
                      <th style={{ padding:'7px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,textAlign:'right',width:50 }}>Qty</th>
                      <th style={{ padding:'7px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,width:40 }}>Unit</th>
                      {viewMode==='internal' && <>
                        <th style={{ padding:'7px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,textAlign:'right',width:75 }}>Unit Cost</th>
                        <th style={{ padding:'7px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,textAlign:'right',width:85 }}>Total Cost</th>
                        <th style={{ padding:'7px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,textAlign:'right',width:50 }}>Mkp%</th>
                      </>}
                      <th style={{ padding:'7px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,textAlign:'right',width:75 }}>Unit Price</th>
                      <th style={{ padding:'7px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,textAlign:'right',width:85 }}>Total Price</th>
                      {viewMode==='internal' && <>
                        <th style={{ padding:'7px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,width:65 }}>Source</th>
                        <th style={{ padding:'7px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,width:55 }}>Stock</th>
                      </>}
                      <th style={{ padding:'7px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,width:28 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLines.map((line,idx)=>{
                      const typeBg = { Material:'#F0F9FF', Labor:'#FFF7ED', Subcontract:'#F5F3FF', Equipment:'#F0FDF4', Misc:'#F9FAFB' }[line.type] || '#F9FAFB';
                      const typeColor = { Material:'#0369A1', Labor:'#C2410C', Subcontract:'#6D28D9', Equipment:'#15803D', Misc:'#6B7280' }[line.type] || '#6B7280';
                      return (
                        <tr key={line.id} style={{ borderBottom:`1px solid ${COLORS.borderLight}`,background: line.changed?'#FFFBEB':line.locked?'#F9FAFB':'transparent' }}>
                          <td style={{ padding:'6px 8px',color:COLORS.textMuted,fontSize:10 }}>
                            <div style={{ display:'flex',alignItems:'center',gap:2 }}>
                              {line.changed && <div style={{ width:5,height:5,borderRadius:3,background:COLORS.orange,flexShrink:0 }}/>}
                              {line.locked && <Eye size={9} style={{ color:COLORS.textMuted }}/>}
                              {!line.changed && !line.locked && <span>{line.n}</span>}
                            </div>
                          </td>
                          {!selectedBuildNode && <td style={{ padding:'6px 8px',fontSize:10,color:COLORS.textSecondary,maxWidth:90,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>
                            {nodes.find(n=>n.id===line.nodeId)?.name || line.nodeId}
                          </td>}
                          <td style={{ padding:'6px 8px' }}>
                            <span style={{ fontSize:9,fontWeight:600,padding:'1px 5px',borderRadius:3,background:typeBg,color:typeColor }}>{line.type}</span>
                          </td>
                          <td style={{ padding:'6px 8px',fontWeight:500 }}>
                            {line.desc}
                            {line.templateId && <FileText size={9} style={{ color:COLORS.textMuted,marginLeft:4 }} title={`From template: ${templates.find(t=>t.id===line.templateId)?.name||''}`}/>}
                          </td>
                          <td style={{ padding:'6px 8px',textAlign:'right',fontWeight:500 }}>{line.qty}</td>
                          <td style={{ padding:'6px 8px',color:COLORS.textMuted }}>{line.unit}</td>
                          {viewMode==='internal' && <>
                            <td style={{ padding:'6px 8px',textAlign:'right' }}>{fmtFull(line.uc)}</td>
                            <td style={{ padding:'6px 8px',textAlign:'right',fontWeight:500 }}>{fmtFull(line.qty*line.uc)}</td>
                            <td style={{ padding:'6px 8px',textAlign:'right',color:COLORS.textMuted }}>{line.markup}%</td>
                          </>}
                          <td style={{ padding:'6px 8px',textAlign:'right' }}>{fmtFull(line.us)}</td>
                          <td style={{ padding:'6px 8px',textAlign:'right',fontWeight:600 }}>{fmtFull(line.qty*line.us)}</td>
                          {viewMode==='internal' && <>
                            <td style={{ padding:'6px 8px' }}>
                              <span style={{ fontSize:9,fontWeight:500,color:srcColor(line.src) }}>{srcLabel(line.src)}</span>
                            </td>
                            <td style={{ padding:'6px 8px' }}>
                              {line.stock !== null ? (
                                <div>
                                  <div style={{ fontSize:10,fontWeight:500 }}>{line.stock}</div>
                                  {procBadge(line.procStatus)}
                                </div>
                              ) : <span style={{ color:COLORS.textMuted,fontSize:10 }}>—</span>}
                            </td>
                          </>}
                          <td style={{ padding:'6px 8px' }}>
                            <button style={{ background:'none',border:'none',cursor:'pointer',padding:2 }}><MoreVertical size={12} style={{ color:COLORS.textMuted }}/></button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Totals footer */}
              <div style={{ borderTop:`2px solid ${COLORS.border}`,padding:'10px 14px',background:'#FAFAF8' }}>
                <div style={{ display:'grid',gridTemplateColumns: viewMode==='internal'?'repeat(7,1fr)':'repeat(4,1fr)',gap:10 }}>
                  {viewMode==='internal' && <>
                    <div><div style={{ fontSize:9,color:COLORS.textSecondary,marginBottom:2 }}>Internal Cost</div><div style={{ fontSize:14,fontWeight:700 }}>{fmt(totals.tc)}</div></div>
                    <div><div style={{ fontSize:9,color:COLORS.textSecondary,marginBottom:2 }}>Material Cost</div><div style={{ fontSize:14,fontWeight:700 }}>{fmt(totals.mc)}</div></div>
                    <div><div style={{ fontSize:9,color:COLORS.textSecondary,marginBottom:2 }}>Labor Cost</div><div style={{ fontSize:14,fontWeight:700 }}>{fmt(totals.lc)}</div></div>
                  </>}
                  <div><div style={{ fontSize:9,color:COLORS.textSecondary,marginBottom:2 }}>Sales Total</div><div style={{ fontSize:14,fontWeight:700 }}>{fmt(totals.ts)}</div></div>
                  <div><div style={{ fontSize:9,color:COLORS.textSecondary,marginBottom:2 }}>Gross Margin</div><div style={{ fontSize:14,fontWeight:700,color:COLORS.green }}>{totals.margin.toFixed(1)}%</div></div>
                  <div><div style={{ fontSize:9,color:COLORS.textSecondary,marginBottom:2 }}>Labor Hours</div><div style={{ fontSize:14,fontWeight:700 }}>{totals.lh}</div></div>
                  {viewMode==='internal' && <div><div style={{ fontSize:9,color:COLORS.textSecondary,marginBottom:2 }}>Subcontract</div><div style={{ fontSize:14,fontWeight:700 }}>{fmt(totals.sc)}</div></div>}
                </div>
              </div>
            </div>

            {/* RIGHT: Summary / Templates / Materials panel */}
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden',display:'flex',flexDirection:'column' }}>
              <div style={{ display:'flex',borderBottom:`1px solid ${COLORS.border}` }}>
                {[{id:'summary',label:'Summary'},{id:'templates',label:'Templates'},{id:'prices',label:'Prices'}].map(tab=>(
                  <button key={tab.id} onClick={()=>setRightPanel(tab.id)}
                    style={{ flex:1,padding:'8px 0',fontSize:10,fontWeight:rightPanel===tab.id?600:400,color:rightPanel===tab.id?COLORS.accent:COLORS.textSecondary,border:'none',background:'none',cursor:'pointer',borderBottom:rightPanel===tab.id?`2px solid ${COLORS.accent}`:'2px solid transparent' }}>
                    {tab.label}
                  </button>
                ))}
              </div>
              <div style={{ flex:1,overflow:'auto',padding:12 }}>
                {rightPanel === 'summary' && (
                  <div>
                    {/* Category breakdown */}
                    <div style={{ fontSize:11,fontWeight:600,marginBottom:8 }}>By Category</div>
                    {categoryBreakdown.map(cat=>(
                      <div key={cat.name} style={{ display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:`1px solid ${COLORS.borderLight}`,fontSize:11 }}>
                        <span style={{ fontWeight:500 }}>{cat.name}</span>
                        <div style={{ textAlign:'right' }}>
                          <div style={{ fontWeight:600 }}>{fmt(cat.cost)}</div>
                          <div style={{ fontSize:10,color:COLORS.textMuted }}>{cat.count} lines</div>
                        </div>
                      </div>
                    ))}

                    {/* Top cost drivers */}
                    <div style={{ fontSize:11,fontWeight:600,marginTop:16,marginBottom:8 }}>Top Cost Drivers</div>
                    {topDrivers.map((line,i)=>(
                      <div key={line.id} style={{ display:'flex',justifyContent:'space-between',padding:'4px 0',borderBottom:`1px solid ${COLORS.borderLight}`,fontSize:11 }}>
                        <span style={{ color:COLORS.textSecondary }}>{i+1}. {line.desc}</span>
                        <span style={{ fontWeight:600 }}>{fmt(line.qty*line.uc)}</span>
                      </div>
                    ))}

                    {/* Risk flags */}
                    <div style={{ fontSize:11,fontWeight:600,marginTop:16,marginBottom:8 }}>Risk Flags</div>
                    {filteredLines.filter(l=>l.procStatus==='Low Stock').length > 0 && (
                      <div style={{ padding:8,background:COLORS.orangeLight,borderRadius:4,fontSize:11,marginBottom:6 }}>
                        <AlertTriangle size={11} style={{ color:COLORS.orange,marginRight:4 }}/>
                        {filteredLines.filter(l=>l.procStatus==='Low Stock').length} items with low stock
                      </div>
                    )}
                    {filteredLines.filter(l=>l.changed).length > 0 && (
                      <div style={{ padding:8,background:COLORS.yellowLight,borderRadius:4,fontSize:11 }}>
                        <Edit size={11} style={{ color:COLORS.yellow,marginRight:4 }}/>
                        {filteredLines.filter(l=>l.changed).length} lines changed vs previous version
                      </div>
                    )}
                  </div>
                )}

                {rightPanel === 'templates' && (
                  <div>
                    <div style={{ fontSize:11,fontWeight:600,marginBottom:8 }}>Assembly Templates</div>
                    {templates.map(tmpl=>(
                      <div key={tmpl.id} style={{ padding:10,border:`1px solid ${COLORS.borderLight}`,borderRadius:6,marginBottom:8,cursor:'pointer',transition:'border-color 0.1s' }}
                        onMouseEnter={e=>e.currentTarget.style.borderColor=COLORS.accent}
                        onMouseLeave={e=>e.currentTarget.style.borderColor=COLORS.borderLight}
                        onClick={()=>{
                          setActiveTemplate(tmpl);
                          const defaultInputs = {};
                          tmpl.inputs.forEach(inp => { defaultInputs[inp.key] = inp.default; });
                          setTemplateInputs(defaultInputs);
                          setShowTemplateDrawer(true);
                        }}>
                        <div style={{ fontSize:12,fontWeight:600,marginBottom:2 }}>{tmpl.name}</div>
                        <div style={{ display:'flex',justifyContent:'space-between',fontSize:10,color:COLORS.textSecondary }}>
                          <span>v{tmpl.version} · {tmpl.category}</span>
                          <span>{tmpl.outputs.length} items</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {rightPanel === 'prices' && (
                  <div>
                    <div style={{ fontSize:11,fontWeight:600,marginBottom:8 }}>Cost Source Distribution</div>
                    {['catalog','last_purchase','manual','norm','supplier_quote'].map(src=>{
                      const count = filteredLines.filter(l=>l.src===src).length;
                      if (count===0) return null;
                      return (
                        <div key={src} style={{ display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:`1px solid ${COLORS.borderLight}`,fontSize:11 }}>
                          <span style={{ display:'flex',alignItems:'center',gap:6 }}>
                            <div style={{ width:8,height:8,borderRadius:2,background:srcColor(src) }}/>
                            {srcLabel(src)}
                          </span>
                          <span style={{ fontWeight:600 }}>{count} lines</span>
                        </div>
                      );
                    })}
                    <div style={{ fontSize:11,fontWeight:600,marginTop:16,marginBottom:8 }}>Supplier Breakdown</div>
                    {[...new Set(filteredLines.filter(l=>l.supplier!=='—').map(l=>l.supplier))].map(sup=>{
                      const cost = filteredLines.filter(l=>l.supplier===sup).reduce((s,l)=>s+l.qty*l.uc, 0);
                      return (
                        <div key={sup} style={{ display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:`1px solid ${COLORS.borderLight}`,fontSize:11 }}>
                          <span>{sup}</span>
                          <span style={{ fontWeight:600 }}>{fmt(cost)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =================== COMPARE TAB =================== */}
        {builderTab === 'compare' && (
          <div>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginBottom:20 }}>
              <div style={{ padding:16,background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,textAlign:'center' }}>
                <div style={{ fontSize:10,color:COLORS.textSecondary,marginBottom:4 }}>Cost Delta</div>
                <div style={{ fontSize:20,fontWeight:700,color:COLORS.red }}>+{fmt(versionCompare.totalCostDelta)}</div>
                <div style={{ fontSize:11,color:COLORS.textMuted }}>{versionCompare.aLabel} → {versionCompare.bLabel}</div>
              </div>
              <div style={{ padding:16,background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,textAlign:'center' }}>
                <div style={{ fontSize:10,color:COLORS.textSecondary,marginBottom:4 }}>Sales Delta</div>
                <div style={{ fontSize:20,fontWeight:700,color:COLORS.green }}>+{fmt(versionCompare.totalSalesDelta)}</div>
              </div>
              <div style={{ padding:16,background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,textAlign:'center' }}>
                <div style={{ fontSize:10,color:COLORS.textSecondary,marginBottom:4 }}>Margin Impact</div>
                <div style={{ fontSize:20,fontWeight:700 }}>{versionCompare.marginDelta >= 0 ? '+' : ''}{versionCompare.marginDelta.toFixed(1)}%</div>
                <div style={{ fontSize:11,color:COLORS.textMuted }}>No margin impact</div>
              </div>
            </div>

            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
              <div style={{ padding:'12px 16px',borderBottom:`1px solid ${COLORS.border}`,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                <h3 style={{ fontSize:14,fontWeight:600,margin:0 }}>Changed Lines — {versionCompare.changes.length} modifications</h3>
                <div style={{ fontSize:11,color:COLORS.textSecondary }}>Grouped by node</div>
              </div>
              <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
                <thead>
                  <tr style={{ background:'#FAFAF8' }}>
                    {['Node','Change Type','Description','Cost Impact'].map(h=>(
                      <th key={h} style={{ textAlign:'left',padding:'10px 14px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {versionCompare.changes.map((ch,i)=>{
                    const typeStyle = { New: { bg:'#D1FAE5', color:'#065F46' }, Modified: { bg:'#FEF3C7', color:'#92400E' }, Removed: { bg:'#FEE2E2', color:'#991B1B' } }[ch.type] || { bg:'#F3F4F6', color:'#6B7280' };
                    return (
                      <tr key={i} style={{ borderBottom:`1px solid ${COLORS.borderLight}` }}>
                        <td style={{ padding:'10px 14px',fontWeight:500 }}>{ch.node}</td>
                        <td style={{ padding:'10px 14px' }}>
                          <span style={{ fontSize:10,fontWeight:600,padding:'2px 6px',borderRadius:3,background:typeStyle.bg,color:typeStyle.color }}>{ch.type}</span>
                        </td>
                        <td style={{ padding:'10px 14px',color:COLORS.textSecondary }}>{ch.desc}</td>
                        <td style={{ padding:'10px 14px',fontWeight:600,color: ch.costDelta>0?COLORS.red:COLORS.green }}>{ch.costDelta>0?'+':''}{fmt(ch.costDelta)}</td>
                      </tr>
                    );
                  })}
                  <tr style={{ background:'#FAFAF8',fontWeight:600 }}>
                    <td colSpan={3} style={{ padding:'10px 14px',textAlign:'right' }}>Total Impact</td>
                    <td style={{ padding:'10px 14px',color:COLORS.red }}>+{fmt(versionCompare.changes.reduce((s,c)=>s+c.costDelta,0))}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =================== TEMPLATES TAB =================== */}
        {builderTab === 'templates' && (
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:16 }}>
            {templates.map(tmpl => {
              const defaultInputs = {};
              tmpl.inputs.forEach(inp => { defaultInputs[inp.key] = inp.default; });
              const preview = computeTemplate(tmpl, defaultInputs);
              return (
                <div key={tmpl.id} style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
                  <div style={{ padding:'14px 16px',borderBottom:`1px solid ${COLORS.border}` }}>
                    <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start' }}>
                      <div>
                        <div style={{ fontSize:14,fontWeight:600 }}>{tmpl.name}</div>
                        <div style={{ fontSize:11,color:COLORS.textSecondary,marginTop:2 }}>v{tmpl.version} · {tmpl.category} · {getUser(tmpl.owner).name}</div>
                      </div>
                      <button onClick={()=>{setActiveTemplate(tmpl);setTemplateInputs(defaultInputs);setShowTemplateDrawer(true);setBuilderTab('builder');}}
                        style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:4,padding:'5px 10px',fontSize:11,cursor:'pointer',fontWeight:500 }}>Apply</button>
                    </div>
                  </div>
                  <div style={{ padding:'10px 16px' }}>
                    <div style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,marginBottom:6 }}>INPUTS (defaults)</div>
                    {tmpl.inputs.map(inp=>(
                      <div key={inp.key} style={{ display:'flex',justifyContent:'space-between',fontSize:11,padding:'2px 0' }}>
                        <span style={{ color:COLORS.textSecondary }}>{inp.label}</span>
                        <span style={{ fontWeight:500 }}>{inp.default}</span>
                      </div>
                    ))}
                    <div style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,marginTop:10,marginBottom:6 }}>OUTPUTS (preview)</div>
                    {preview.results.map((r,i)=>(
                      <div key={i} style={{ display:'flex',justifyContent:'space-between',fontSize:11,padding:'2px 0' }}>
                        <span>{r.materialName}</span>
                        <span style={{ fontWeight:500 }}>{r.qty} {r.unit}</span>
                      </div>
                    ))}
                    <div style={{ display:'flex',justifyContent:'space-between',fontSize:11,padding:'4px 0',marginTop:4,borderTop:`1px solid ${COLORS.borderLight}`,fontWeight:600 }}>
                      <span>{tmpl.laborLabel}</span>
                      <span>{preview.laborHrs} hrs ({fmtFull(preview.laborCost)})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* =================== TEMPLATE APPLY DRAWER =================== */}
        {showTemplateDrawer && activeTemplate && (
          <div style={{ position:'fixed',top:0,right:0,bottom:0,width:420,background:'white',boxShadow:'-4px 0 30px rgba(0,0,0,0.15)',zIndex:1000,display:'flex',flexDirection:'column',animation:'slideIn 0.2s ease' }}>
            <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
            <div style={{ padding:'16px 20px',borderBottom:`1px solid ${COLORS.border}`,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
              <div>
                <div style={{ fontSize:15,fontWeight:600 }}>{activeTemplate.name}</div>
                <div style={{ fontSize:11,color:COLORS.textSecondary }}>v{activeTemplate.version} · {activeTemplate.category}</div>
              </div>
              <button onClick={()=>{setShowTemplateDrawer(false);setActiveTemplate(null);}} style={{ background:'none',border:'none',cursor:'pointer' }}><X size={18}/></button>
            </div>

            <div style={{ flex:1,overflow:'auto',padding:20 }}>
              {/* Target */}
              <div style={{ fontSize:11,fontWeight:600,color:COLORS.textSecondary,marginBottom:8 }}>TARGET NODE</div>
              <div style={{ padding:10,border:`1px solid ${COLORS.border}`,borderRadius:6,marginBottom:20,fontSize:12 }}>
                {selectedNodeData ? (
                  <div><span style={{ fontWeight:600 }}>{selectedNodeData.name}</span> <span style={{ color:COLORS.textMuted }}>({selectedNodeData.code})</span></div>
                ) : (
                  <div style={{ color:COLORS.textMuted }}>Select a node from the tree first</div>
                )}
              </div>

              {/* Input parameters */}
              <div style={{ fontSize:11,fontWeight:600,color:COLORS.textSecondary,marginBottom:8 }}>INPUT PARAMETERS</div>
              {activeTemplate.inputs.map(inp=>(
                <div key={inp.key} style={{ marginBottom:12 }}>
                  <label style={{ fontSize:11,color:COLORS.textSecondary,display:'block',marginBottom:4 }}>{inp.label}</label>
                  <input type="number" value={templateInputs[inp.key]||''} onChange={e=>setTemplateInputs({...templateInputs,[inp.key]:e.target.value})}
                    style={{ width:'100%',padding:'8px 10px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:13,fontWeight:500,outline:'none',boxSizing:'border-box' }}/>
                </div>
              ))}

              {/* Generated outputs */}
              {(() => {
                const result = computeTemplate(activeTemplate, templateInputs);
                return (
                  <div>
                    <div style={{ fontSize:11,fontWeight:600,color:COLORS.textSecondary,marginTop:16,marginBottom:8 }}>GENERATED MATERIALS</div>
                    <div style={{ border:`1px solid ${COLORS.border}`,borderRadius:6,overflow:'hidden' }}>
                      {result.results.map((r,i)=>(
                        <div key={i} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 10px',borderBottom:`1px solid ${COLORS.borderLight}`,fontSize:12 }}>
                          <div>
                            <div style={{ fontWeight:500 }}>{r.materialName}</div>
                            {r.waste > 0 && <div style={{ fontSize:10,color:COLORS.textMuted }}>incl. {r.waste}% waste</div>}
                          </div>
                          <div style={{ textAlign:'right' }}>
                            <div style={{ fontWeight:600 }}>{r.qty} {r.unit}</div>
                            {r.cost > 0 && <div style={{ fontSize:10,color:COLORS.textMuted }}>{fmtFull(r.qty * r.cost)}</div>}
                          </div>
                        </div>
                      ))}
                      <div style={{ display:'flex',justifyContent:'space-between',padding:'10px',background:'#FAFAF8',fontWeight:600,fontSize:12 }}>
                        <span>{activeTemplate.laborLabel}</span>
                        <span>{result.laborHrs} hrs · {fmtFull(result.laborCost)}</span>
                      </div>
                    </div>

                    <div style={{ marginTop:12,padding:10,background:'#F0F9FF',borderRadius:6,fontSize:11 }}>
                      <div style={{ fontWeight:600,marginBottom:4 }}>Total estimated cost</div>
                      <div style={{ fontSize:16,fontWeight:700 }}>{fmtFull(result.results.reduce((s,r)=>s+r.qty*r.cost, 0) + result.laborCost)}</div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div style={{ padding:'16px 20px',borderTop:`1px solid ${COLORS.border}`,display:'flex',gap:10 }}>
              <button onClick={()=>{showToast(`Template "${activeTemplate.name}" applied to ${selectedNodeData?.name||'project'}`);setShowTemplateDrawer(false);setActiveTemplate(null);}}
                style={{ flex:1,background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'10px',fontSize:13,cursor:'pointer',fontWeight:600 }}>Apply to Estimate</button>
              <button onClick={()=>{setShowTemplateDrawer(false);setActiveTemplate(null);}}
                style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'10px 16px',fontSize:13,cursor:'pointer',fontWeight:500 }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================================
  // PAGE: Warehouse
  // ============================================================
  const WarehousePage = () => {
    const [whTab, setWhTab] = useState('central-stock');
    const [whProject, setWhProject] = useState('p2');
    const [transferForm, setTransferForm] = useState(false);

    const lowStock = warehouseStock.filter(s=>s.lowStock);
    const pendingFulfill = materialRequests.filter(r=>['Approved','Partially Fulfilled'].includes(r.status));
    const whNodes = projectNodes[whProject] || [];
    const projStockFiltered = projectStock.filter(s=>s.projectId===whProject && s.qty > 0);

    // Group project stock by node
    const stockByNode = {};
    projStockFiltered.forEach(s => {
      const node = whNodes.find(n=>n.id===s.nodeId);
      const key = node?.name || s.nodeId;
      if (!stockByNode[key]) stockByNode[key] = { nodeId: s.nodeId, items: [] };
      stockByNode[key].items.push(s);
    });

    return (
      <div>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16 }}>
          <div>
            <h1 style={{ fontSize:22,fontWeight:700,color:COLORS.text,margin:0 }}>Warehouse & Site Stock</h1>
            <p style={{ fontSize:13,color:COLORS.textSecondary,margin:'4px 0 0' }}>Central warehouse + project area stock control</p>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:10,marginBottom:16 }}>
          <KpiCard label="Central SKUs" value={warehouseStock.length} icon={Warehouse}/>
          <KpiCard label="Low Stock" value={lowStock.length} icon={AlertTriangle} color={COLORS.red}/>
          <KpiCard label="Pending Issues" value={pendingFulfill.length} icon={Truck} color={COLORS.orange}/>
          <KpiCard label="In Transit" value={1} icon={ArrowRight} color={COLORS.accent} sub="DL-24044"/>
          <KpiCard label="Site Items" value={projStockFiltered.length} icon={MapPin} color={COLORS.green}/>
          <KpiCard label="Transfers" value={transferOrders.filter(t=>t.status==='In Transit').length} icon={ArrowLeftRight} color={COLORS.accent} sub="in transit" onClick={()=>setCurrentPage('transfers')}/>
        </div>

        {/* Perspective Tabs */}
        <div style={{ display:'flex',gap:0,borderBottom:`1px solid ${COLORS.border}`,marginBottom:16 }}>
          {[
            {id:'central-stock',label:'Central Warehouse'},
            {id:'project-stock',label:'Project Area Stock'},
            {id:'transfers',label:`Transfers (${transferOrders.length})`},
            {id:'movements',label:'Movement Log'},
          ].map(t=>(
            <button key={t.id} onClick={()=>setWhTab(t.id)}
              style={{ padding:'10px 18px',fontSize:12,fontWeight:whTab===t.id?600:400,color:whTab===t.id?COLORS.accent:COLORS.textSecondary,border:'none',background:'none',cursor:'pointer',borderBottom:whTab===t.id?`2px solid ${COLORS.accent}`:'2px solid transparent' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ===== CENTRAL WAREHOUSE STOCK ===== */}
        {whTab === 'central-stock' && (
          <div>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16 }}>
              <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:16 }}>
                <h3 style={{ fontSize:14,fontWeight:600,margin:'0 0 12px' }}>Low Stock / Reorder</h3>
                {lowStock.map(s=>{
                  const mat=getMaterial(s.materialId);
                  return (
                    <div key={s.materialId} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:`1px solid ${COLORS.borderLight}`,fontSize:12 }}>
                      <div>
                        <div style={{ fontWeight:500 }}>{mat.name}</div>
                        <div style={{ color:COLORS.textMuted,fontSize:10 }}>{mat.sku} · {mat.unit}</div>
                      </div>
                      <div style={{ textAlign:'right',display:'flex',alignItems:'center',gap:8 }}>
                        <div>
                          <div style={{ fontWeight:600,color:COLORS.red }}>{s.available} avail</div>
                          <div style={{ color:COLORS.textMuted,fontSize:10 }}>On hand: {s.onHand}</div>
                        </div>
                        <button onClick={()=>showToast(`Reorder suggestion created for ${mat.name}`)} style={{ background:COLORS.orange,color:'white',border:'none',borderRadius:4,padding:'4px 8px',fontSize:10,cursor:'pointer',fontWeight:600 }}>Reorder</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:16 }}>
                <h3 style={{ fontSize:14,fontWeight:600,margin:'0 0 12px' }}>Pending Fulfillments</h3>
                {pendingFulfill.map(mr=>(
                  <div key={mr.id} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:`1px solid ${COLORS.borderLight}`,fontSize:12 }}>
                    <div>
                      <div style={{ fontWeight:500,color:COLORS.accent }}>{mr.id}</div>
                      <div style={{ color:COLORS.textSecondary }}>{getProject(mr.projectId)?.code} · {getNode(mr.projectId,mr.nodeId)?.name||'—'}</div>
                    </div>
                    <div style={{ display:'flex',alignItems:'center',gap:6 }}>
                      <StatusBadge status={mr.status} size="xs"/>
                      <button onClick={()=>showToast('Fulfillment started')} style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:4,padding:'4px 10px',fontSize:11,cursor:'pointer',fontWeight:500 }}>Fulfill</button>
                    </div>
                  </div>
                ))}
                {pendingFulfill.length===0 && <div style={{ color:COLORS.textMuted,fontSize:12,textAlign:'center',padding:16 }}>No pending fulfillments</div>}
              </div>
            </div>

            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
              <div style={{ padding:'12px 16px',borderBottom:`1px solid ${COLORS.border}`,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                <h3 style={{ fontSize:14,fontWeight:600,margin:0 }}>Central Warehouse Stock</h3>
                <div style={{ display:'flex',gap:8 }}>
                  <button onClick={()=>showToast('Issue form opened')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'6px 12px',fontSize:12,cursor:'pointer',fontWeight:500 }}>Issue</button>
                  <button onClick={()=>showToast('Receive form opened')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'6px 12px',fontSize:12,cursor:'pointer',fontWeight:500 }}>Receive</button>
                  <button onClick={()=>showToast('Adjustment form opened')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'6px 12px',fontSize:12,cursor:'pointer',fontWeight:500 }}>Adjust</button>
                </div>
              </div>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12,minWidth:700 }}>
                  <thead>
                    <tr style={{ background:'#FAFAF8' }}>
                      {['SKU','Material','Category','Unit','On Hand','Reserved','Available','Status','Last Movement'].map(h=>(
                        <th key={h} style={{ textAlign:'left',padding:'10px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {warehouseStock.map(s=>{
                      const mat=getMaterial(s.materialId);
                      return (
                        <tr key={s.materialId} style={{ borderBottom:`1px solid ${COLORS.borderLight}`,background:s.lowStock?COLORS.redLight+'40':'transparent' }}>
                          <td style={{ padding:'10px 12px',fontWeight:500,color:COLORS.textMuted }}>{mat.sku}</td>
                          <td style={{ padding:'10px 12px',fontWeight:500 }}>{mat.name}</td>
                          <td style={{ padding:'10px 12px',color:COLORS.textSecondary,fontSize:11 }}>{mat.category}</td>
                          <td style={{ padding:'10px 12px',color:COLORS.textMuted }}>{mat.unit}</td>
                          <td style={{ padding:'10px 12px',textAlign:'right' }}>{s.onHand}</td>
                          <td style={{ padding:'10px 12px',textAlign:'right',color:COLORS.orange }}>{s.reserved}</td>
                          <td style={{ padding:'10px 12px',textAlign:'right',fontWeight:600,color:s.lowStock?COLORS.red:COLORS.text }}>{s.available}</td>
                          <td style={{ padding:'10px 12px' }}>
                            {s.lowStock ? <span style={{ fontSize:9,fontWeight:600,padding:'2px 6px',borderRadius:3,background:COLORS.redLight,color:COLORS.red }}>Low Stock</span>
                            : <span style={{ fontSize:9,fontWeight:600,padding:'2px 6px',borderRadius:3,background:COLORS.greenLight,color:COLORS.green }}>OK</span>}
                          </td>
                          <td style={{ padding:'10px 12px',color:COLORS.textMuted }}>{s.lastMovement}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          {transferOrders.filter(t=>t.status==='In Transit').length > 0 && (
            <div style={{ padding:'10px 16px',background:COLORS.accentLight,border:`1px solid ${COLORS.accent}30`,borderRadius:8,marginTop:12,display:'flex',alignItems:'center',gap:10 }}>
              <Truck size={16} style={{ color:COLORS.accent,flexShrink:0 }}/>
              <div style={{ fontSize:12 }}>
                <b style={{ color:COLORS.accent }}>{transferOrders.filter(t=>t.status==='In Transit').length} transfer(s) in transit</b> — materials currently moving to site areas.
                <span onClick={()=>setCurrentPage('transfers')} style={{ color:COLORS.accent,cursor:'pointer',marginLeft:6,fontWeight:500 }}>View →</span>
              </div>
            </div>
          )}
          </div>
        )}

        {/* ===== PROJECT AREA STOCK ===== */}
        {whTab === 'project-stock' && (
          <div>
            <div style={{ display:'flex',gap:10,marginBottom:16 }}>
              <select value={whProject} onChange={e=>setWhProject(e.target.value)}
                style={{ padding:'8px 12px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:12,outline:'none',background:'white' }}>
                {projects.map(p=><option key={p.id} value={p.id}>{p.code} — {p.name.split('–')[0].trim()}</option>)}
              </select>
              <button onClick={()=>setCurrentPage('new-transfer')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'8px 14px',fontSize:12,cursor:'pointer',fontWeight:500,display:'flex',alignItems:'center',gap:5 }}>
                <RefreshCw size={13}/>New Transfer
              </button>
            </div>

            {/* Smart availability notice */}
            {projStockFiltered.some(s=>s.status==='available' && s.qty>=3) && (
              <div style={{ padding:'10px 16px',background:'#F0FDF4',border:`1px solid ${COLORS.green}30`,borderRadius:8,marginBottom:16,display:'flex',alignItems:'center',gap:10 }}>
                <Check size={16} style={{ color:COLORS.green,flexShrink:0 }}/>
                <div style={{ fontSize:12 }}>
                  <b style={{ color:COLORS.green }}>Materials available on site.</b> Before requesting from warehouse, check area stock below. 
                  {projStockFiltered.filter(s=>s.status==='available').length} item(s) available across {Object.keys(stockByNode).length} areas — internal transfer may avoid new purchase.
                </div>
              </div>
            )}

            {/* Area cards */}
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:12 }}>
              {Object.entries(stockByNode).map(([nodeName, data]) => (
                <div key={nodeName} style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
                  <div style={{ padding:'10px 14px',borderBottom:`1px solid ${COLORS.border}`,background:'#FAFAF8',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                    <div>
                      <div style={{ fontSize:13,fontWeight:600 }}>{nodeName}</div>
                      <div style={{ fontSize:10,color:COLORS.textMuted }}>{data.items.length} material(s) on site</div>
                    </div>
                    <button onClick={()=>showToast(`Transfer from ${nodeName}...`)} style={{ background:'none',border:`1px solid ${COLORS.border}`,borderRadius:4,padding:'3px 8px',fontSize:10,cursor:'pointer',display:'flex',alignItems:'center',gap:3 }}>
                      <ArrowRight size={10}/>Transfer
                    </button>
                  </div>
                  <div style={{ padding:10 }}>
                    {data.items.map((s,i)=>{
                      const mat=getMaterial(s.materialId);
                      const statusColors = { available:COLORS.green, reserved:COLORS.orange, damaged:COLORS.red, consumed:COLORS.textMuted };
                      return (
                        <div key={i} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 4px',borderBottom:i<data.items.length-1?`1px solid ${COLORS.borderLight}`:'none' }}>
                          <div>
                            <div style={{ fontSize:11,fontWeight:500 }}>{mat.name}</div>
                            {s.note && <div style={{ fontSize:9,color:COLORS.textMuted }}>{s.note}</div>}
                          </div>
                          <div style={{ display:'flex',alignItems:'center',gap:6 }}>
                            <span style={{ fontSize:12,fontWeight:700 }}>{s.qty}</span>
                            <span style={{ fontSize:9,color:COLORS.textMuted }}>{mat.unit}</span>
                            <span style={{ fontSize:8,fontWeight:600,padding:'1px 5px',borderRadius:3,background:statusColors[s.status]+'18',color:statusColors[s.status],textTransform:'uppercase' }}>{s.status}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {Object.keys(stockByNode).length===0 && (
                <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:30,textAlign:'center',color:COLORS.textMuted,gridColumn:'1/-1' }}>
                  <Package size={24} style={{ marginBottom:8 }}/>
                  <div style={{ fontSize:13 }}>No on-site stock recorded for this project</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== TRANSFERS ===== */}
        {whTab === 'transfers' && (
          <div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12 }}>
              <div style={{ fontSize:13,color:COLORS.textSecondary }}>
                Recent transfer orders.
                <span onClick={()=>setCurrentPage('transfers')} style={{ color:COLORS.accent,cursor:'pointer',marginLeft:6,fontWeight:500 }}>Open full Transfers page →</span>
              </div>
              <button onClick={()=>setCurrentPage('new-transfer')}
                style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 14px',fontSize:12,cursor:'pointer',fontWeight:600,display:'flex',alignItems:'center',gap:5 }}>
                <Plus size={13}/>New Transfer
              </button>
            </div>
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
              <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
                <thead>
                  <tr style={{ background:'#FAFAF8' }}>
                    {['Transfer #','Source','Destination','Status','Lines','Created'].map(h=>(
                      <th key={h} style={{ textAlign:'left',padding:'10px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transferOrders.slice(-6).reverse().map(t=>(
                    <tr key={t.id} style={{ borderBottom:`1px solid ${COLORS.borderLight}`,cursor:'pointer' }}
                      onClick={()=>{ setSelectedTransferId(t.id); setCurrentPage('transfer-detail'); }}
                      onMouseEnter={e=>e.currentTarget.style.background='#FAFAF8'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <td style={{ padding:'10px 12px',fontWeight:600,color:COLORS.accent }}>{t.transferNo}</td>
                      <td style={{ padding:'10px 12px' }}>{getLocation(t.sourceLocationId).name}</td>
                      <td style={{ padding:'10px 12px' }}>{getLocation(t.destinationLocationId).name}</td>
                      <td style={{ padding:'10px 12px' }}><StatusBadge status={t.status} size="xs"/></td>
                      <td style={{ padding:'10px 12px',textAlign:'center' }}>{t.lines.length}</td>
                      <td style={{ padding:'10px 12px',color:COLORS.textMuted }}>{t.createdAt.slice(0,10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== MOVEMENT LOG ===== */}
        {whTab === 'movements' && (
          <div>
            <div style={{ fontSize:13,color:COLORS.textSecondary,marginBottom:12 }}>Complete audit trail of all material movements</div>
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12,minWidth:900 }}>
                  <thead>
                    <tr style={{ background:'#FAFAF8' }}>
                      {['ID','Date','Type','Material','Qty','From','To','Reference','Status'].map(h=>(
                        <th key={h} style={{ textAlign:'left',padding:'10px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {movementLog.map(m=>{
                      const typeColors = { 'Supplier → Warehouse':'#2563EB', 'Supplier → Project':'#2563EB', 'Warehouse → Project':'#16A34A', 'Area → Area':'#7C3AED', 'Consumed':'#6B7280', 'Damaged':'#DC2626' };
                      return (
                        <tr key={m.id} style={{ borderBottom:`1px solid ${COLORS.borderLight}` }}>
                          <td style={{ padding:'10px 12px',fontWeight:500,color:COLORS.textMuted }}>{m.id}</td>
                          <td style={{ padding:'10px 12px' }}>{m.date}</td>
                          <td style={{ padding:'10px 12px' }}>
                            <span style={{ fontSize:10,fontWeight:600,padding:'2px 7px',borderRadius:4,background:(typeColors[m.type]||'#6B7280')+'15',color:typeColors[m.type]||'#6B7280' }}>{m.type}</span>
                          </td>
                          <td style={{ padding:'10px 12px',fontWeight:500 }}>{m.material}</td>
                          <td style={{ padding:'10px 12px',fontWeight:600 }}>{m.qty}</td>
                          <td style={{ padding:'10px 12px',color:COLORS.textSecondary,fontSize:11 }}>{m.from}</td>
                          <td style={{ padding:'10px 12px',color:COLORS.textSecondary,fontSize:11 }}>{m.to}</td>
                          <td style={{ padding:'10px 12px',fontWeight:500,color:COLORS.accent,fontSize:11 }}>{m.ref}</td>
                          <td style={{ padding:'10px 12px' }}>
                            <StatusBadge status={m.status==='Received'?'Accepted':m.status==='Delivered'?'Fulfilled':m.status==='Completed'?'Fulfilled':m.status==='Used'?'Fulfilled':m.status==='Write-off'?'Rejected':m.status} size="xs"/>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================================
  // PAGE: Approvals
  // ============================================================
  const ApprovalsPage = () => {
    const [selAppr, setSelAppr] = useState(selectedApproval);
    const pending = approvals.filter(a=>a.status==='Pending');
    const completed = approvals.filter(a=>a.status!=='Pending');
    const selected = approvals.find(a=>a.id===selAppr);

    return (
      <div>
        <h1 style={{ fontSize:22,fontWeight:700,color:COLORS.text,margin:'0 0 20px' }}>Approval Center</h1>

        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,minHeight:500 }}>
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
            <div style={{ padding:'12px 16px',borderBottom:`1px solid ${COLORS.border}`,fontSize:13,fontWeight:600 }}>
              Pending ({pending.length})
            </div>
            {pending.map(a=>(
              <div key={a.id} onClick={()=>setSelAppr(a.id)}
                style={{ padding:'12px 16px',borderBottom:`1px solid ${COLORS.borderLight}`,cursor:'pointer',background: selAppr===a.id?COLORS.accentLight:'transparent',borderLeft: selAppr===a.id?`3px solid ${COLORS.accent}`:'3px solid transparent' }}
                onMouseEnter={e=>{ if(selAppr!==a.id) e.currentTarget.style.background='#FAFAF8'; }}
                onMouseLeave={e=>{ if(selAppr!==a.id) e.currentTarget.style.background='transparent'; }}>
                <div style={{ display:'flex',justifyContent:'space-between',marginBottom:4 }}>
                  <span style={{ fontSize:12,fontWeight:600 }}>{a.id} — {a.type}</span>
                  <StatusBadge status={a.priority} size="xs"/>
                </div>
                <div style={{ fontSize:11,color:COLORS.textSecondary,marginBottom:4 }}>{a.description}</div>
                <div style={{ display:'flex',justifyContent:'space-between',fontSize:10,color:COLORS.textMuted }}>
                  <span>{getProject(a.projectId)?.code}</span>
                  <span>{fmt(a.amount)}</span>
                  <span>{a.submitted}</span>
                </div>
              </div>
            ))}
            <div style={{ padding:'12px 16px',borderBottom:`1px solid ${COLORS.border}`,fontSize:13,fontWeight:600,marginTop:8 }}>
              Completed ({completed.length})
            </div>
            {completed.map(a=>(
              <div key={a.id} onClick={()=>setSelAppr(a.id)}
                style={{ padding:'12px 16px',borderBottom:`1px solid ${COLORS.borderLight}`,cursor:'pointer',background: selAppr===a.id?COLORS.accentLight:'transparent',opacity:0.7 }}>
                <div style={{ display:'flex',justifyContent:'space-between',marginBottom:2 }}>
                  <span style={{ fontSize:12,fontWeight:500 }}>{a.id} — {a.type}</span>
                  <StatusBadge status={a.status} size="xs"/>
                </div>
                <div style={{ fontSize:11,color:COLORS.textSecondary }}>{a.description.slice(0,60)}...</div>
              </div>
            ))}
          </div>

          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:20 }}>
            {selected ? (
              <div>
                <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16 }}>
                  <div>
                    <h3 style={{ fontSize:16,fontWeight:600,margin:0 }}>{selected.id}</h3>
                    <div style={{ fontSize:12,color:COLORS.textSecondary,marginTop:4 }}>{selected.type}</div>
                  </div>
                  <StatusBadge status={selected.status}/>
                </div>
                <div style={{ fontSize:13,marginBottom:16,lineHeight:1.6 }}>{selected.description}</div>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20 }}>
                  {[['Project',getProject(selected.projectId)?.code||'—'],['Node',getNode(selected.projectId,selected.nodeId)?.name||'General'],['Requested By',getUser(selected.requestedBy).name],['Amount',fmt(selected.amount)],['Submitted',selected.submitted],['Priority',selected.priority]].map(([k,v])=>(
                    <div key={k} style={{ padding:10,background:'#FAFAF8',borderRadius:6 }}>
                      <div style={{ fontSize:10,color:COLORS.textSecondary,marginBottom:2 }}>{k}</div>
                      <div style={{ fontSize:13,fontWeight:500 }}>{v}</div>
                    </div>
                  ))}
                </div>
                {selected.status==='Pending' && (
                  <div style={{ display:'flex',gap:10 }}>
                    <button onClick={()=>showToast(`${selected.id} approved`)} style={{ background:COLORS.green,color:'white',border:'none',borderRadius:6,padding:'10px 20px',fontSize:13,cursor:'pointer',fontWeight:600,flex:1 }}>Approve</button>
                    <button onClick={()=>showToast(`${selected.id} rejected`)} style={{ background:COLORS.red,color:'white',border:'none',borderRadius:6,padding:'10px 20px',fontSize:13,cursor:'pointer',fontWeight:600,flex:1 }}>Reject</button>
                    <button onClick={()=>showToast('Clarification requested')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'10px 20px',fontSize:13,cursor:'pointer',fontWeight:500 }}>Clarify</button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:COLORS.textMuted,fontSize:13 }}>
                Select an approval to review
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // PAGE: Transfer List
  // ============================================================
  const TransferListPage = () => {
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [filterProject, setFilterProject] = useState('all');

    const typeLabel = { warehouse_to_area:'WH → Area', area_to_area:'Area → Area', area_to_warehouse:'Area → WH' };
    const statuses = ['Draft','Submitted','Approved','Picked','In Transit','Received','Partially Received','Cancelled'];

    const filtered = transferOrders.filter(t => {
      if (filterStatus!=='all' && t.status!==filterStatus) return false;
      if (filterType!=='all' && t.transferType!==filterType) return false;
      if (filterProject!=='all' && t.projectId!==filterProject) return false;
      return true;
    });

    const openDetail = (id) => { setSelectedTransferId(id); setCurrentPage('transfer-detail'); };

    return (
      <div>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16 }}>
          <div>
            <h1 style={{ fontSize:22,fontWeight:700,color:COLORS.text,margin:0 }}>Transfers</h1>
            <p style={{ fontSize:13,color:COLORS.textSecondary,margin:'4px 0 0' }}>Material transfer orders between locations</p>
          </div>
          <button onClick={()=>setCurrentPage('new-transfer')}
            style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'9px 16px',fontSize:13,cursor:'pointer',fontWeight:600,display:'flex',alignItems:'center',gap:6 }}>
            <Plus size={14}/>New Transfer
          </button>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16 }}>
          <KpiCard label="Total Transfers" value={transferOrders.length} icon={ArrowLeftRight} color={COLORS.accent}/>
          <KpiCard label="In Transit" value={transferOrders.filter(t=>t.status==='In Transit').length} icon={Truck} color={COLORS.accent} sub="awaiting receipt"/>
          <KpiCard label="Pending Approval" value={transferOrders.filter(t=>t.status==='Submitted').length} icon={Clock} color={COLORS.orange}/>
          <KpiCard label="Completed" value={transferOrders.filter(t=>t.status==='Received').length} icon={Check} color={COLORS.green}/>
        </div>

        <div style={{ display:'flex',gap:8,marginBottom:12,flexWrap:'wrap' }}>
          <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
            style={{ padding:'7px 10px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:12,outline:'none',background:'white' }}>
            <option value="all">All Statuses</option>
            {statuses.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filterType} onChange={e=>setFilterType(e.target.value)}
            style={{ padding:'7px 10px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:12,outline:'none',background:'white' }}>
            <option value="all">All Types</option>
            {Object.entries(typeLabel).map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
          <select value={filterProject} onChange={e=>setFilterProject(e.target.value)}
            style={{ padding:'7px 10px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:12,outline:'none',background:'white' }}>
            <option value="all">All Projects</option>
            {projects.map(p=><option key={p.id} value={p.id}>{p.code}</option>)}
          </select>
          {(filterStatus!=='all'||filterType!=='all'||filterProject!=='all') && (
            <button onClick={()=>{setFilterStatus('all');setFilterType('all');setFilterProject('all');}}
              style={{ padding:'7px 12px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:12,cursor:'pointer',background:'white',color:COLORS.textSecondary }}>
              Clear
            </button>
          )}
        </div>

        <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12,minWidth:900 }}>
              <thead>
                <tr style={{ background:'#FAFAF8' }}>
                  {['Transfer #','Source','Destination','Type','Status','Requested By','Created','Sent','Received','Lines','Actions'].map(h=>(
                    <th key={h} style={{ textAlign:'left',padding:'10px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}`,whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length===0 && (
                  <tr><td colSpan={11} style={{ padding:32,textAlign:'center',color:COLORS.textMuted }}>No transfers match filters</td></tr>
                )}
                {filtered.map(t => {
                  const srcLoc = getLocation(t.sourceLocationId);
                  const dstLoc = getLocation(t.destinationLocationId);
                  const reqBy  = getUser(t.requestedByUserId);
                  return (
                    <tr key={t.id} style={{ borderBottom:`1px solid ${COLORS.borderLight}`,cursor:'pointer' }}
                      onMouseEnter={e=>e.currentTarget.style.background='#FAFAF8'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <td style={{ padding:'10px 12px' }}>
                        <span onClick={()=>openDetail(t.id)} style={{ fontWeight:600,color:COLORS.accent,cursor:'pointer' }}>{t.transferNo}</span>
                      </td>
                      <td style={{ padding:'10px 12px',maxWidth:140,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{srcLoc.name}</td>
                      <td style={{ padding:'10px 12px',maxWidth:140,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{dstLoc.name}</td>
                      <td style={{ padding:'10px 12px' }}>
                        <span style={{ fontSize:10,fontWeight:600,padding:'2px 7px',borderRadius:4,background:COLORS.accentLight,color:COLORS.accent }}>{typeLabel[t.transferType]||t.transferType}</span>
                      </td>
                      <td style={{ padding:'10px 12px' }}><StatusBadge status={t.status} size="xs"/></td>
                      <td style={{ padding:'10px 12px',color:COLORS.textSecondary }}>{reqBy?.name?.split(' ')[0]||'—'}</td>
                      <td style={{ padding:'10px 12px',color:COLORS.textMuted }}>{t.createdAt.slice(0,10)}</td>
                      <td style={{ padding:'10px 12px',color:COLORS.textMuted }}>{t.sentAt?t.sentAt.slice(0,10):'—'}</td>
                      <td style={{ padding:'10px 12px',color:COLORS.textMuted }}>{t.receivedAt?t.receivedAt.slice(0,10):'—'}</td>
                      <td style={{ padding:'10px 12px',textAlign:'center',fontWeight:600 }}>{t.lines.length}</td>
                      <td style={{ padding:'10px 12px' }}>
                        <div style={{ display:'flex',gap:4 }}>
                          <button onClick={()=>openDetail(t.id)}
                            style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:4,padding:'3px 8px',fontSize:10,cursor:'pointer',fontWeight:500,display:'flex',alignItems:'center',gap:3 }}>
                            <Eye size={10}/>View
                          </button>
                          {t.status==='Draft'     && <button onClick={e=>{e.stopPropagation();submitTransfer(t.id);}}  style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:4,padding:'3px 8px',fontSize:10,cursor:'pointer',fontWeight:600 }}>Submit</button>}
                          {t.status==='Submitted' && <button onClick={e=>{e.stopPropagation();approveTransfer(t.id);}} style={{ background:COLORS.green, color:'white',border:'none',borderRadius:4,padding:'3px 8px',fontSize:10,cursor:'pointer',fontWeight:600 }}>Approve</button>}
                          {t.status==='Approved'  && <button onClick={e=>{e.stopPropagation();pickTransfer(t.id);}}    style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:4,padding:'3px 8px',fontSize:10,cursor:'pointer',fontWeight:600 }}>Pick</button>}
                          {t.status==='Picked'    && <button onClick={e=>{e.stopPropagation();sendTransfer(t.id);}}    style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:4,padding:'3px 8px',fontSize:10,cursor:'pointer',fontWeight:600 }}>Send</button>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // PAGE: New Transfer Wizard
  // ============================================================
  const NewTransferPage = () => {
    const [step, setStep] = useState(1);
    const [header, setHeader] = useState({
      transferType: 'warehouse_to_area',
      sourceLocationId: 'loc-wh',
      destinationLocationId: 'loc-p2-n7',
      projectId: 'p2',
      reason: '',
      notes: '',
    });
    const [lines, setLines] = useState([]);
    const [lineMatId, setLineMatId] = useState('');
    const [lineQty, setLineQty] = useState('');

    const srcLoc = getLocation(header.sourceLocationId);

    const addLine = () => {
      if (!lineMatId || !lineQty || Number(lineQty) <= 0) { showToast('Select material and enter qty'); return; }
      if (lines.find(l => l.materialId === lineMatId)) { showToast('Material already added'); return; }
      const mat = materials.find(m => m.id === lineMatId);
      setLines(prev => [...prev, { id:`nl-${Date.now()}`, materialId:lineMatId, requestedQty:Number(lineQty), approvedQty:0, pickedQty:0, shippedQty:0, receivedQty:0, uom:mat.unit, conditionNote:'', discrepancyNote:'' }]);
      setLineMatId(''); setLineQty('');
    };

    const handleCreate = () => {
      if (lines.length === 0) { showToast('Add at least one line'); return; }
      if (!header.reason.trim()) { showToast('Reason is required'); return; }
      const newId = `to-${Date.now()}`;
      const newTRF = {
        id: newId,
        transferNo: `TRF-${new Date().getFullYear()}-${String(transferOrders.length + 1).padStart(3,'0')}`,
        ...header, status: 'Draft',
        requestedByUserId: currentUser.id,
        approvedByUserId: null, pickedByUserId: null, receivedByUserId: null,
        sentAt: null, receivedAt: null, lines,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      };
      setTransferOrders(prev => [...prev, newTRF]);
      showToast(`${newTRF.transferNo} created as Draft`);
      setSelectedTransferId(newId);
      setCurrentPage('transfer-detail');
    };

    const stepDot = (n) => ({
      width:28,height:28,borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',
      fontSize:12,fontWeight:700,flexShrink:0,
      background: step > n ? COLORS.green : step === n ? COLORS.accent : COLORS.border,
      color: step >= n ? 'white' : COLORS.textMuted,
    });

    return (
      <div style={{ maxWidth:720,margin:'0 auto' }}>
        <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:20,cursor:'pointer',color:COLORS.textSecondary,fontSize:13 }}
          onClick={()=>setCurrentPage('transfers')}>
          <ChevronLeft size={16}/>Back to Transfers
        </div>
        <h1 style={{ fontSize:22,fontWeight:700,color:COLORS.text,margin:'0 0 20px' }}>New Transfer Order</h1>

        <div style={{ display:'flex',alignItems:'center',marginBottom:24 }}>
          {[{n:1,label:'Header'},{n:2,label:'Lines'},{n:3,label:'Review'}].map((s,i)=>(
            <div key={s.n} style={{ display:'flex',alignItems:'center' }}>
              <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                <div style={stepDot(s.n)}>{step > s.n ? <Check size={12}/> : s.n}</div>
                <span style={{ fontSize:12,fontWeight:step===s.n?600:400,color:step===s.n?COLORS.text:COLORS.textMuted }}>{s.label}</span>
              </div>
              {i<2 && <div style={{ width:40,height:2,background:step>s.n?COLORS.green:COLORS.border,margin:'0 8px' }}/>}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:24 }}>
            <h3 style={{ fontSize:15,fontWeight:600,margin:'0 0 20px' }}>Transfer Details</h3>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
              <div style={{ gridColumn:'1/-1' }}>
                <label style={{ fontSize:12,fontWeight:500,color:COLORS.textSecondary,display:'block',marginBottom:6 }}>Transfer Type</label>
                <div style={{ display:'flex',gap:8 }}>
                  {[['warehouse_to_area','WH → Project Area'],['area_to_area','Area → Area'],['area_to_warehouse','Area → Warehouse']].map(([v,l])=>(
                    <button key={v} onClick={()=>setHeader(h=>({...h,transferType:v}))}
                      style={{ flex:1,padding:'9px 12px',border:`1px solid ${header.transferType===v?COLORS.accent:COLORS.border}`,borderRadius:6,fontSize:12,cursor:'pointer',fontWeight:header.transferType===v?600:400,background:header.transferType===v?COLORS.accentLight:'white',color:header.transferType===v?COLORS.accent:COLORS.text }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize:12,fontWeight:500,color:COLORS.textSecondary,display:'block',marginBottom:6 }}>Source Location</label>
                <select value={header.sourceLocationId} onChange={e=>setHeader(h=>({...h,sourceLocationId:e.target.value}))}
                  style={{ width:'100%',padding:'9px 12px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:12,outline:'none',background:'white' }}>
                  {inventoryLocations.map(l=><option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:12,fontWeight:500,color:COLORS.textSecondary,display:'block',marginBottom:6 }}>Destination Location</label>
                <select value={header.destinationLocationId} onChange={e=>setHeader(h=>({...h,destinationLocationId:e.target.value}))}
                  style={{ width:'100%',padding:'9px 12px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:12,outline:'none',background:'white' }}>
                  {inventoryLocations.filter(l=>l.id!==header.sourceLocationId).map(l=><option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:12,fontWeight:500,color:COLORS.textSecondary,display:'block',marginBottom:6 }}>Project</label>
                <select value={header.projectId} onChange={e=>setHeader(h=>({...h,projectId:e.target.value}))}
                  style={{ width:'100%',padding:'9px 12px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:12,outline:'none',background:'white' }}>
                  {projects.map(p=><option key={p.id} value={p.id}>{p.code} — {p.name.split('–')[0].trim()}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:12,fontWeight:500,color:COLORS.textSecondary,display:'block',marginBottom:6 }}>Reason <span style={{ color:COLORS.red }}>*</span></label>
                <input value={header.reason} onChange={e=>setHeader(h=>({...h,reason:e.target.value}))} placeholder="e.g. Phase 2 drywall materials"
                  style={{ width:'100%',padding:'9px 12px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:12,outline:'none' }}/>
              </div>
              <div style={{ gridColumn:'1/-1' }}>
                <label style={{ fontSize:12,fontWeight:500,color:COLORS.textSecondary,display:'block',marginBottom:6 }}>Notes</label>
                <textarea value={header.notes} onChange={e=>setHeader(h=>({...h,notes:e.target.value}))} rows={2} placeholder="Optional notes..."
                  style={{ width:'100%',padding:'9px 12px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:12,outline:'none',resize:'vertical' }}/>
              </div>
            </div>
            <div style={{ display:'flex',justifyContent:'flex-end',marginTop:20 }}>
              <button onClick={()=>{ if(!header.reason.trim()){showToast('Reason is required');return;} setStep(2); }}
                style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'10px 24px',fontSize:13,cursor:'pointer',fontWeight:600 }}>
                Next: Add Lines
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:24 }}>
            <h3 style={{ fontSize:15,fontWeight:600,margin:'0 0 12px' }}>Transfer Lines</h3>
            <div style={{ padding:'10px 14px',background:COLORS.accentLight,borderRadius:6,marginBottom:16,fontSize:12,color:COLORS.accent }}>
              Source: <strong>{srcLoc.name}</strong> — select materials and quantities below.
            </div>
            <div style={{ display:'flex',gap:8,marginBottom:16,alignItems:'flex-end' }}>
              <div style={{ flex:2 }}>
                <label style={{ fontSize:11,fontWeight:500,color:COLORS.textSecondary,display:'block',marginBottom:4 }}>Material</label>
                <select value={lineMatId} onChange={e=>setLineMatId(e.target.value)}
                  style={{ width:'100%',padding:'8px 10px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:12,outline:'none',background:'white' }}>
                  <option value="">— Select material —</option>
                  {materials.map(m=>{
                    const bal = getBalanceAtLocation(header.sourceLocationId, m.id);
                    return <option key={m.id} value={m.id}>{m.name} (avail: {bal.available} {m.unit})</option>;
                  })}
                </select>
              </div>
              <div style={{ flex:1 }}>
                <label style={{ fontSize:11,fontWeight:500,color:COLORS.textSecondary,display:'block',marginBottom:4 }}>Qty</label>
                <input type="number" min="1" value={lineQty} onChange={e=>setLineQty(e.target.value)}
                  style={{ width:'100%',padding:'8px 10px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:12,outline:'none' }}/>
              </div>
              <button onClick={addLine}
                style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 16px',fontSize:12,cursor:'pointer',fontWeight:600,whiteSpace:'nowrap' }}>
                Add
              </button>
            </div>
            {lines.length > 0 ? (
              <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12,marginBottom:16 }}>
                <thead>
                  <tr style={{ background:'#FAFAF8' }}>
                    {['Material','UOM','Qty','Available',''].map(h=>(
                      <th key={h} style={{ textAlign:'left',padding:'8px 10px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lines.map(l=>{
                    const mat = materials.find(m=>m.id===l.materialId);
                    const bal = getBalanceAtLocation(header.sourceLocationId, l.materialId);
                    const over = l.requestedQty > bal.available;
                    return (
                      <tr key={l.id} style={{ borderBottom:`1px solid ${COLORS.borderLight}`,background:over?COLORS.redLight+'40':'transparent' }}>
                        <td style={{ padding:'8px 10px',fontWeight:500 }}>{mat?.name}</td>
                        <td style={{ padding:'8px 10px',color:COLORS.textMuted }}>{l.uom}</td>
                        <td style={{ padding:'8px 10px',fontWeight:700,color:over?COLORS.red:COLORS.text }}>{l.requestedQty}</td>
                        <td style={{ padding:'8px 10px',color:over?COLORS.red:COLORS.green,fontWeight:500 }}>{bal.available}</td>
                        <td style={{ padding:'8px 10px' }}><button onClick={()=>setLines(prev=>prev.filter(x=>x.id!==l.id))} style={{ background:'none',border:'none',cursor:'pointer',color:COLORS.red }}><X size={14}/></button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign:'center',padding:'20px 0',color:COLORS.textMuted,fontSize:13 }}>No lines added yet</div>
            )}
            <div style={{ display:'flex',justifyContent:'space-between',marginTop:8 }}>
              <button onClick={()=>setStep(1)} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'9px 20px',fontSize:13,cursor:'pointer',fontWeight:500 }}>Back</button>
              <button onClick={()=>{ if(lines.length===0){showToast('Add at least one line');return;} setStep(3); }}
                style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'9px 24px',fontSize:13,cursor:'pointer',fontWeight:600 }}>Next: Review</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:24 }}>
            <h3 style={{ fontSize:15,fontWeight:600,margin:'0 0 16px' }}>Review & Submit</h3>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20 }}>
              {[
                ['Source', getLocation(header.sourceLocationId).name],
                ['Destination', getLocation(header.destinationLocationId).name],
                ['Type', {warehouse_to_area:'WH → Area',area_to_area:'Area → Area',area_to_warehouse:'Area → WH'}[header.transferType]],
                ['Project', projects.find(p=>p.id===header.projectId)?.code||'—'],
                ['Reason', header.reason],
                ['Requested By', currentUser.name],
              ].map(([k,v])=>(
                <div key={k} style={{ padding:'10px 12px',background:'#FAFAF8',borderRadius:6 }}>
                  <div style={{ fontSize:10,color:COLORS.textSecondary,marginBottom:2 }}>{k}</div>
                  <div style={{ fontSize:13,fontWeight:500 }}>{v}</div>
                </div>
              ))}
            </div>
            <h4 style={{ fontSize:13,fontWeight:600,margin:'0 0 10px',color:COLORS.textSecondary }}>Lines ({lines.length})</h4>
            <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12,marginBottom:20 }}>
              <thead>
                <tr style={{ background:'#FAFAF8' }}>
                  {['Material','UOM','Requested Qty','Available at Source'].map(h=>(
                    <th key={h} style={{ textAlign:'left',padding:'8px 10px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lines.map(l=>{
                  const mat = materials.find(m=>m.id===l.materialId);
                  const bal = getBalanceAtLocation(header.sourceLocationId, l.materialId);
                  return (
                    <tr key={l.id} style={{ borderBottom:`1px solid ${COLORS.borderLight}` }}>
                      <td style={{ padding:'8px 10px',fontWeight:500 }}>{mat?.name}</td>
                      <td style={{ padding:'8px 10px',color:COLORS.textMuted }}>{l.uom}</td>
                      <td style={{ padding:'8px 10px',fontWeight:700 }}>{l.requestedQty}</td>
                      <td style={{ padding:'8px 10px',color:l.requestedQty>bal.available?COLORS.red:COLORS.green,fontWeight:500 }}>{bal.available}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ display:'flex',justifyContent:'space-between' }}>
              <button onClick={()=>setStep(2)} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'9px 20px',fontSize:13,cursor:'pointer',fontWeight:500 }}>Back</button>
              <button onClick={handleCreate} style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'9px 24px',fontSize:13,cursor:'pointer',fontWeight:600 }}>Create Transfer (Draft)</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================================
  // PAGE: Transfer Detail
  // ============================================================
  const TransferDetailPage = () => {
    const t = transferOrders.find(x => x.id === selectedTransferId);
    const [showReceive, setShowReceive] = useState(false);
    const [receiptLines, setReceiptLines] = useState([]);

    const initReceipt = () => {
      if (!t) return;
      setReceiptLines(t.lines.map(l => ({ lineId:l.id, materialId:l.materialId, shippedQty:l.shippedQty, receivedQty:l.shippedQty, conditionNote:'Good', discrepancyNote:'' })));
      setShowReceive(true);
    };

    if (!t) return (
      <div style={{ textAlign:'center',padding:60,color:COLORS.textMuted }}>
        <AlertTriangle size={24} style={{ marginBottom:8,display:'block',margin:'0 auto 8px' }}/>
        <div>Transfer not found</div>
        <button onClick={()=>setCurrentPage('transfers')} style={{ marginTop:12,background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 16px',fontSize:12,cursor:'pointer' }}>Back to Transfers</button>
      </div>
    );

    const srcLoc = getLocation(t.sourceLocationId);
    const dstLoc = getLocation(t.destinationLocationId);
    const reqBy  = getUser(t.requestedByUserId);
    const appBy  = t.approvedByUserId ? getUser(t.approvedByUserId) : null;
    const pickedBy = t.pickedByUserId ? getUser(t.pickedByUserId) : null;
    const recvBy = t.receivedByUserId ? getUser(t.receivedByUserId) : null;

    const typeLabel = { warehouse_to_area:'WH → Area', area_to_area:'Area → Area', area_to_warehouse:'Area → WH' };
    const timelineSteps = ['Draft','Submitted','Approved','Picked','In Transit','Received'];
    const statusOrder = { Draft:0,Submitted:1,Approved:2,Picked:3,'In Transit':4,Received:5,'Partially Received':5,Cancelled:-1,Rejected:-1 };
    const currentIdx = statusOrder[t.status] ?? 0;

    const relatedMovements = inventoryMovements.filter(m => m.referenceId === t.id);

    const canSubmit  = t.status === 'Draft';
    const canApprove = t.status === 'Submitted';
    const canPick    = t.status === 'Approved';
    const canSend    = t.status === 'Picked';
    const canReceive = t.status === 'In Transit';
    const canCancel  = !['Received','Partially Received','Cancelled','Rejected'].includes(t.status);

    const movTypeColors = { reserve:COLORS.orange, unreserve:COLORS.textMuted, issue:COLORS.accent, receipt:COLORS.green, adjustment:COLORS.purple };

    return (
      <div>
        <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:16,fontSize:13,color:COLORS.textSecondary,cursor:'pointer' }}
          onClick={()=>setCurrentPage('transfers')}>
          <ChevronLeft size={16}/>Back to Transfers
        </div>

        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20 }}>
          <div>
            <h1 style={{ fontSize:22,fontWeight:700,color:COLORS.text,margin:0 }}>{t.transferNo}</h1>
            <div style={{ display:'flex',gap:10,alignItems:'center',marginTop:6 }}>
              <StatusBadge status={t.status}/>
              <span style={{ fontSize:12,color:COLORS.textSecondary }}>{typeLabel[t.transferType]}</span>
              <span style={{ fontSize:12,color:COLORS.textMuted }}>Created {t.createdAt.slice(0,10)}</span>
            </div>
          </div>
          <div style={{ display:'flex',gap:8,flexWrap:'wrap',justifyContent:'flex-end' }}>
            {canSubmit  && <button onClick={()=>submitTransfer(t.id)}  style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 16px',fontSize:13,cursor:'pointer',fontWeight:600 }}>Submit</button>}
            {canApprove && <button onClick={()=>approveTransfer(t.id)} style={{ background:COLORS.green, color:'white',border:'none',borderRadius:6,padding:'8px 16px',fontSize:13,cursor:'pointer',fontWeight:600 }}>Approve</button>}
            {canPick    && <button onClick={()=>pickTransfer(t.id)}    style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 16px',fontSize:13,cursor:'pointer',fontWeight:600 }}>Mark Picked</button>}
            {canSend    && <button onClick={()=>sendTransfer(t.id)}    style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 16px',fontSize:13,cursor:'pointer',fontWeight:600 }}>Mark Sent</button>}
            {canReceive && !showReceive && <button onClick={initReceipt} style={{ background:COLORS.green,color:'white',border:'none',borderRadius:6,padding:'8px 16px',fontSize:13,cursor:'pointer',fontWeight:600 }}>Receive</button>}
            {canCancel  && <button onClick={()=>cancelTransfer(t.id)}  style={{ background:'white',border:`1px solid ${COLORS.red}`,color:COLORS.red,borderRadius:6,padding:'8px 16px',fontSize:13,cursor:'pointer',fontWeight:500 }}>Cancel</button>}
          </div>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16 }}>
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:16 }}>
            <h3 style={{ fontSize:13,fontWeight:600,margin:'0 0 12px',color:COLORS.textSecondary }}>Transfer Info</h3>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:8 }}>
              {[['Source',srcLoc.name],['Destination',dstLoc.name],['Project',projects.find(p=>p.id===t.projectId)?.code||'—'],['Type',typeLabel[t.transferType]],['Requested By',reqBy?.name||'—'],['Approved By',appBy?.name||'—'],['Picked By',pickedBy?.name||'—'],['Received By',recvBy?.name||'—']].map(([k,v])=>(
                <div key={k} style={{ padding:'8px 10px',background:'#FAFAF8',borderRadius:5 }}>
                  <div style={{ fontSize:10,color:COLORS.textSecondary,marginBottom:2 }}>{k}</div>
                  <div style={{ fontSize:12,fontWeight:500 }}>{v}</div>
                </div>
              ))}
            </div>
            {t.reason && <div style={{ marginTop:10,padding:'8px 10px',background:'#FAFAF8',borderRadius:5,fontSize:12 }}><strong>Reason:</strong> {t.reason}</div>}
            {t.notes && <div style={{ marginTop:6,padding:'8px 10px',background:'#FAFAF8',borderRadius:5,fontSize:12,color:COLORS.textSecondary }}><strong>Notes:</strong> {t.notes}</div>}
          </div>

          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:16 }}>
            <h3 style={{ fontSize:13,fontWeight:600,margin:'0 0 16px',color:COLORS.textSecondary }}>Status Timeline</h3>
            {t.status === 'Cancelled' ? (
              <div style={{ padding:'12px 16px',background:COLORS.redLight,borderRadius:6,fontSize:12,color:COLORS.red,fontWeight:500 }}>This transfer was cancelled</div>
            ) : (
              <div style={{ display:'flex',flexDirection:'column',gap:0 }}>
                {timelineSteps.map((step,i)=>{
                  const done = i <= currentIdx;
                  const curr = i === currentIdx;
                  return (
                    <div key={step} style={{ display:'flex',gap:12,alignItems:'flex-start' }}>
                      <div style={{ display:'flex',flexDirection:'column',alignItems:'center' }}>
                        <div style={{ width:22,height:22,borderRadius:11,background:done?COLORS.green:COLORS.border,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                          {done ? <Check size={11} style={{ color:'white' }}/> : <div style={{ width:7,height:7,borderRadius:4,background:'white' }}/>}
                        </div>
                        {i < timelineSteps.length-1 && <div style={{ width:2,height:18,background:done?COLORS.green+'50':COLORS.border }}/>}
                      </div>
                      <div style={{ paddingBottom:10 }}>
                        <div style={{ fontSize:12,fontWeight:curr?700:500,color:curr?COLORS.text:done?COLORS.textSecondary:COLORS.textMuted }}>{step}</div>
                        {step==='Draft' && <div style={{ fontSize:10,color:COLORS.textMuted }}>{t.createdAt.slice(0,10)}</div>}
                        {step==='In Transit'&&t.sentAt && <div style={{ fontSize:10,color:COLORS.textMuted }}>{t.sentAt.slice(0,10)}</div>}
                        {step==='Received'&&t.receivedAt && <div style={{ fontSize:10,color:COLORS.textMuted }}>{t.receivedAt.slice(0,10)}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Lines table */}
        <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden',marginBottom:16 }}>
          <div style={{ padding:'12px 16px',borderBottom:`1px solid ${COLORS.border}`,fontSize:13,fontWeight:600 }}>Transfer Lines ({t.lines.length})</div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12,minWidth:700 }}>
              <thead>
                <tr style={{ background:'#FAFAF8' }}>
                  {['Material','UOM','Requested','Approved','Picked','Shipped','Received','Condition / Note'].map(h=>(
                    <th key={h} style={{ textAlign:'left',padding:'9px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.lines.map(l=>{
                  const mat = materials.find(m=>m.id===l.materialId);
                  const hasDisc = l.discrepancyNote && l.receivedQty !== l.shippedQty;
                  return (
                    <tr key={l.id} style={{ borderBottom:`1px solid ${COLORS.borderLight}`,background:hasDisc?COLORS.yellowLight+'40':'transparent' }}>
                      <td style={{ padding:'9px 12px',fontWeight:500 }}>{mat?.name||l.materialId}</td>
                      <td style={{ padding:'9px 12px',color:COLORS.textMuted }}>{l.uom}</td>
                      <td style={{ padding:'9px 12px' }}>{l.requestedQty}</td>
                      <td style={{ padding:'9px 12px',color:l.approvedQty>0?COLORS.green:COLORS.textMuted }}>{l.approvedQty||'—'}</td>
                      <td style={{ padding:'9px 12px',color:l.pickedQty>0?COLORS.accent:COLORS.textMuted }}>{l.pickedQty||'—'}</td>
                      <td style={{ padding:'9px 12px' }}>{l.shippedQty||'—'}</td>
                      <td style={{ padding:'9px 12px',fontWeight:l.receivedQty>0?700:400,color:l.receivedQty>0?COLORS.green:COLORS.textMuted }}>{l.receivedQty||'—'}</td>
                      <td style={{ padding:'9px 12px',fontSize:11 }}>
                        {l.conditionNote||'—'}
                        {l.discrepancyNote && <div style={{ color:COLORS.orange,marginTop:2 }}>{l.discrepancyNote}</div>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Receive Form */}
        {showReceive && canReceive && (
          <div style={{ background:COLORS.card,border:`2px solid ${COLORS.green}`,borderRadius:8,padding:20,marginBottom:16 }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12 }}>
              <h3 style={{ fontSize:14,fontWeight:600,margin:0 }}>Record Receipt at {dstLoc.name}</h3>
              <button onClick={()=>setShowReceive(false)} style={{ background:'none',border:'none',cursor:'pointer',color:COLORS.textMuted }}><X size={16}/></button>
            </div>
            <div style={{ padding:'8px 12px',background:COLORS.greenLight,borderRadius:6,marginBottom:12,fontSize:12,color:COLORS.green }}>
              Verify quantities received. Adjust and add discrepancy notes if needed.
            </div>
            {receiptLines.map((rl,i)=>{
              const mat = materials.find(m=>m.id===rl.materialId);
              return (
                <div key={rl.lineId} style={{ padding:14,background:'#FAFAF8',borderRadius:6,marginBottom:10 }}>
                  <div style={{ fontWeight:500,fontSize:13,marginBottom:10 }}>{mat?.name} <span style={{ color:COLORS.textMuted,fontWeight:400,fontSize:11 }}>({rl.uom}) — Shipped: {rl.shippedQty}</span></div>
                  <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10 }}>
                    <div>
                      <label style={{ fontSize:11,color:COLORS.textSecondary,display:'block',marginBottom:4 }}>Received Qty *</label>
                      <input type="number" min="0" max={rl.shippedQty} value={rl.receivedQty}
                        onChange={e=>setReceiptLines(prev=>prev.map((r,j)=>j===i?{...r,receivedQty:Number(e.target.value)}:r))}
                        style={{ width:'100%',padding:'7px 10px',border:`1px solid ${COLORS.border}`,borderRadius:5,fontSize:12,outline:'none' }}/>
                    </div>
                    <div>
                      <label style={{ fontSize:11,color:COLORS.textSecondary,display:'block',marginBottom:4 }}>Condition</label>
                      <select value={rl.conditionNote} onChange={e=>setReceiptLines(prev=>prev.map((r,j)=>j===i?{...r,conditionNote:e.target.value}:r))}
                        style={{ width:'100%',padding:'7px 10px',border:`1px solid ${COLORS.border}`,borderRadius:5,fontSize:12,outline:'none',background:'white' }}>
                        <option>Good</option><option>Damaged</option><option>Partial</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize:11,color:COLORS.textSecondary,display:'block',marginBottom:4 }}>Discrepancy Note</label>
                      <input value={rl.discrepancyNote} onChange={e=>setReceiptLines(prev=>prev.map((r,j)=>j===i?{...r,discrepancyNote:e.target.value}:r))}
                        placeholder="e.g. 2 sheets damaged"
                        style={{ width:'100%',padding:'7px 10px',border:`1px solid ${COLORS.border}`,borderRadius:5,fontSize:12,outline:'none' }}/>
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ border:`2px dashed ${COLORS.border}`,borderRadius:6,padding:12,textAlign:'center',marginBottom:14 }}>
              <Camera size={18} style={{ color:COLORS.textMuted,marginBottom:4 }}/>
              <div style={{ fontSize:11,color:COLORS.textMuted }}>Photo attachments (placeholder)</div>
              <button onClick={()=>showToast('Photo upload not available in demo')}
                style={{ marginTop:6,background:'white',border:`1px solid ${COLORS.border}`,borderRadius:5,padding:'4px 12px',fontSize:11,cursor:'pointer',color:COLORS.textSecondary,display:'inline-flex',alignItems:'center',gap:4 }}>
                <Upload size={10}/>Upload
              </button>
            </div>
            <div style={{ display:'flex',gap:10 }}>
              <button onClick={()=>{ receiveTransfer(t.id, receiptLines); setShowReceive(false); }}
                style={{ background:COLORS.green,color:'white',border:'none',borderRadius:6,padding:'9px 20px',fontSize:13,cursor:'pointer',fontWeight:600 }}>Accept</button>
              <button onClick={()=>{ const withNote=receiptLines.map(r=>({...r,discrepancyNote:r.discrepancyNote||'Discrepancy noted'})); receiveTransfer(t.id,withNote); setShowReceive(false); }}
                style={{ background:COLORS.orange,color:'white',border:'none',borderRadius:6,padding:'9px 20px',fontSize:13,cursor:'pointer',fontWeight:600 }}>Accept with Discrepancy</button>
              <button onClick={()=>{ cancelTransfer(t.id); setShowReceive(false); }}
                style={{ background:COLORS.red,color:'white',border:'none',borderRadius:6,padding:'9px 20px',fontSize:13,cursor:'pointer',fontWeight:600 }}>Reject</button>
            </div>
          </div>
        )}

        {/* Movement History */}
        {relatedMovements.length > 0 && (
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden',marginBottom:16 }}>
            <div style={{ padding:'12px 16px',borderBottom:`1px solid ${COLORS.border}`,fontSize:13,fontWeight:600 }}>Movement History ({relatedMovements.length})</div>
            <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
              <thead>
                <tr style={{ background:'#FAFAF8' }}>
                  {['Type','Material','Qty','From','To','By','Date'].map(h=>(
                    <th key={h} style={{ textAlign:'left',padding:'8px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {relatedMovements.map(m=>{
                  const mat = materials.find(x=>x.id===m.materialId);
                  const c = movTypeColors[m.movementType]||COLORS.textMuted;
                  return (
                    <tr key={m.id} style={{ borderBottom:`1px solid ${COLORS.borderLight}` }}>
                      <td style={{ padding:'8px 12px' }}><span style={{ fontSize:10,fontWeight:600,padding:'2px 7px',borderRadius:4,background:c+'18',color:c }}>{m.movementType}</span></td>
                      <td style={{ padding:'8px 12px',fontWeight:500 }}>{mat?.name||m.materialId}</td>
                      <td style={{ padding:'8px 12px',fontWeight:700 }}>{m.qty} {m.uom}</td>
                      <td style={{ padding:'8px 12px',fontSize:11,color:COLORS.textSecondary }}>{m.fromLocationId?getLocation(m.fromLocationId).name:'—'}</td>
                      <td style={{ padding:'8px 12px',fontSize:11,color:COLORS.textSecondary }}>{m.toLocationId?getLocation(m.toLocationId).name:'—'}</td>
                      <td style={{ padding:'8px 12px',color:COLORS.textSecondary }}>{getUser(m.performedByUserId)?.name?.split(' ')[0]||'—'}</td>
                      <td style={{ padding:'8px 12px',color:COLORS.textMuted }}>{m.timestamp.slice(0,10)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Attachments placeholder */}
        <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:16 }}>
          <h3 style={{ fontSize:13,fontWeight:600,margin:'0 0 10px' }}>Attachments</h3>
          <div style={{ border:`2px dashed ${COLORS.border}`,borderRadius:6,padding:16,textAlign:'center' }}>
            <Upload size={18} style={{ color:COLORS.textMuted,marginBottom:6 }}/>
            <div style={{ fontSize:12,color:COLORS.textMuted }}>Drag & drop files or click to browse (placeholder)</div>
            <button onClick={()=>showToast('File upload not available in demo')}
              style={{ marginTop:8,background:'white',border:`1px solid ${COLORS.border}`,borderRadius:5,padding:'5px 14px',fontSize:11,cursor:'pointer',color:COLORS.textSecondary }}>Browse Files</button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // PAGE: Field Reports
  // ============================================================
  // ============================================================
  // PAGE: Field Reports (Enhanced)
  // ============================================================
  const FieldReportsPage = () => {
    const [selectedReport, setSelectedReport] = useState(null);
    const [reportTab, setReportTab] = useState('reports');
    const [detailTab, setDetailTab] = useState('summary');

    // New report form state
    const [nrProject, setNrProject] = useState('p2');
    const [nrNodeId, setNrNodeId] = useState('');
    const [nrWeek, setNrWeek] = useState('W10 2025');
    const [nrProgress, setNrProgress] = useState('');
    const [nrSections, setNrSections] = useState({ completed:'', inProgress:'', blocked:'', qualityIssues:'', safetyIssues:'', materialShortages:'', subcontractorIssues:'', decisionsNeeded:'' });
    const [nrWpRows, setNrWpRows] = useState([
      { wp:'Gypsum Board Installation', planned:'', actual:'', note:'', delayReason:'' },
      { wp:'Tile Laying', planned:'', actual:'', note:'', delayReason:'' },
      { wp:'', planned:'', actual:'', note:'', delayReason:'' },
    ]);
    const [nrBlockers, setNrBlockers] = useState([]);
    const [nrPhotos, setNrPhotos] = useState([]);
    const [nrNextWeek, setNrNextWeek] = useState({ planned:'', materialsNeeded:'', laborNeed:'', risks:'' });
    const [nrSaved, setNrSaved] = useState(false);
    const [nrFormTab, setNrFormTab] = useState('sections');

    const nrNodes = projectNodes[nrProject] || [];
    const nrSelectedNodeName = nrNodes.find(n=>n.id===nrNodeId)?.name || '';

    const updateNrSection = (key, val) => setNrSections({...nrSections, [key]: val});
    const updateNrWpRow = (idx, field, val) => { const next=[...nrWpRows]; next[idx]={...next[idx],[field]:val}; setNrWpRows(next); };
    const addNrWpRow = () => setNrWpRows([...nrWpRows, { wp:'', planned:'', actual:'', note:'', delayReason:'' }]);
    const removeNrWpRow = (idx) => { if(nrWpRows.length>1) setNrWpRows(nrWpRows.filter((_,i)=>i!==idx)); };
    const addNrBlocker = () => setNrBlockers([...nrBlockers, { type:'Material Delay', severity:'Medium', description:'', owner:'u6', dueDate:'' }]);
    const updateNrBlocker = (idx, field, val) => { const next=[...nrBlockers]; next[idx]={...next[idx],[field]:val}; setNrBlockers(next); };
    const removeNrBlocker = (idx) => setNrBlockers(nrBlockers.filter((_,i)=>i!==idx));
    const addNrPhoto = () => setNrPhotos([...nrPhotos, { caption:'', category:'Progress', area: nrSelectedNodeName }]);
    const updateNrPhoto = (idx, field, val) => { const next=[...nrPhotos]; next[idx]={...next[idx],[field]:val}; setNrPhotos(next); };
    const removeNrPhoto = (idx) => setNrPhotos(nrPhotos.filter((_,i)=>i!==idx));

    const nrFilledSections = Object.values(nrSections).filter(v=>v.trim()).length;
    const nrFilledWp = nrWpRows.filter(r=>r.wp && r.actual).length;
    const nrCompleteness = (nrProject&&nrNodeId&&nrProgress?20:0) + Math.min(nrFilledSections*5, 30) + Math.min(nrFilledWp*10, 20) + (nrNextWeek.planned?15:0) + Math.min(nrPhotos.length*5, 15);

    const report = weeklyReports.find(r=>r.id===selectedReport);
    const openBlockers = allBlockers.filter(b=>b.status==='Open');
    const missingCount = 2;
    const totalBlockers = allBlockers.length;
    const qualityIssues = weeklyReports.filter(r=>r.sections?.qualityIssues && r.sections.qualityIssues !== 'None.' && r.sections.qualityIssues !== 'None').length;

    const photoCategories = { Progress: COLORS.accent, Issue: COLORS.red, Quality: COLORS.orange, Safety: COLORS.yellow, Delivery: COLORS.green };
    const sectionLabels = { completed:'Completed Works', inProgress:'Works in Progress', blocked:'Blocked Works', qualityIssues:'Quality Issues', safetyIssues:'Safety Issues', materialShortages:'Material Shortages', subcontractorIssues:'Subcontractor Issues', decisionsNeeded:'Decisions Needed by Management' };

    return (
      <div>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16 }}>
          <div>
            <h1 style={{ fontSize:22,fontWeight:700,color:COLORS.text,margin:0 }}>Field Reports</h1>
            <p style={{ fontSize:13,color:COLORS.textSecondary,margin:'4px 0 0' }}>{weeklyReports.length} reports · {openBlockers.length} open blockers</p>
          </div>
          <button onClick={()=>{setReportTab('new-report');setNrSaved(false);setNrFormTab('sections');}} style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 16px',fontSize:13,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:6 }}>
            <Plus size={14}/>New Report
          </button>
        </div>

        {/* Summary Cards */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))',gap:10,marginBottom:16 }}>
          <KpiCard label="Reports Missing" value={missingCount} icon={AlertTriangle} color={COLORS.red}/>
          <KpiCard label="Open Blockers" value={openBlockers.length} icon={X} color={COLORS.orange}/>
          <KpiCard label="Quality Issues" value={qualityIssues} icon={Eye} color={COLORS.yellow}/>
          <KpiCard label="Submitted W09" value={weeklyReports.filter(r=>r.week==='W09 2025').length} icon={FileText} color={COLORS.green}/>
          <KpiCard label="Total Photos" value={weeklyReports.reduce((s,r)=>s+r.photoCount,0)} icon={Camera} color={COLORS.accent}/>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex',gap:0,borderBottom:`1px solid ${COLORS.border}`,marginBottom:16 }}>
          {['reports','new-report','blockers'].map(t=>(
            <button key={t} onClick={()=>setReportTab(t)}
              style={{ padding:'10px 20px',fontSize:13,fontWeight:reportTab===t?600:400,color:reportTab===t?COLORS.accent:COLORS.textSecondary,border:'none',background:'none',cursor:'pointer',borderBottom:reportTab===t?`2px solid ${COLORS.accent}`:'2px solid transparent' }}>
              {t==='reports'?'Weekly Reports':t==='new-report'?'New Report':'Blockers Board'}{t==='blockers'?` (${openBlockers.length})`:''}
            </button>
          ))}
        </div>

        {reportTab === 'reports' && (
          <div style={{ display:'grid',gridTemplateColumns: selectedReport?'400px 1fr':'1fr',gap:16,minHeight:500 }}>
            {/* Report List */}
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
              <div style={{ maxHeight: selectedReport?600:'none',overflowY:'auto' }}>
                {weeklyReports.map(wr=>{
                  const delta = wr.progress - (wr.prevProgress||0);
                  return (
                    <div key={wr.id} onClick={()=>{setSelectedReport(wr.id);setDetailTab('summary');}}
                      style={{ padding:'12px 16px',borderBottom:`1px solid ${COLORS.borderLight}`,cursor:'pointer',background:selectedReport===wr.id?COLORS.accentLight:'transparent',borderLeft:selectedReport===wr.id?`3px solid ${COLORS.accent}`:'3px solid transparent' }}
                      onMouseEnter={e=>{if(selectedReport!==wr.id) e.currentTarget.style.background='#FAFAF8';}}
                      onMouseLeave={e=>{if(selectedReport!==wr.id) e.currentTarget.style.background='transparent';}}>
                      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4 }}>
                        <span style={{ fontSize:13,fontWeight:600 }}>{wr.id}</span>
                        <div style={{ display:'flex',gap:4,alignItems:'center' }}>
                          {wr.blockerFlag && <span style={{ background:COLORS.redLight,color:COLORS.red,fontSize:9,fontWeight:700,padding:'2px 6px',borderRadius:3 }}>BLOCKER</span>}
                          <StatusBadge status={wr.completeness||'Submitted'} size="xs"/>
                        </div>
                      </div>
                      <div style={{ fontSize:12,fontWeight:500,marginBottom:2 }}>{getProject(wr.projectId)?.code} · {getNode(wr.projectId,wr.nodeId)?.name||'General'}</div>
                      <div style={{ fontSize:11,color:COLORS.textSecondary,marginBottom:6 }}>{wr.week} · {wr.submittedDate}</div>
                      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                        <div style={{ flex:1,marginRight:12 }}>
                          <ProgressBar value={wr.progress} height={5}/>
                        </div>
                        <span style={{ fontSize:11,fontWeight:600 }}>{wr.progress}%</span>
                        <span style={{ fontSize:10,color:delta>0?COLORS.green:COLORS.textMuted,marginLeft:6 }}>{delta>0?`+${delta}`:delta}%</span>
                      </div>
                      <div style={{ display:'flex',gap:8,marginTop:6,fontSize:10,color:COLORS.textMuted }}>
                        <span style={{ display:'flex',alignItems:'center',gap:2 }}><Camera size={10}/>{wr.photoCount}</span>
                        <span>{(wr.blockers||[]).length} blocker(s)</span>
                        <span>{(wr.wpProgress||[]).length} work packages</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Report Detail */}
            {report && (
              <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:0,overflow:'hidden' }}>
                {/* Detail Header */}
                <div style={{ padding:'16px 20px',borderBottom:`1px solid ${COLORS.border}`,background:'#FAFAF8' }}>
                  <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize:16,fontWeight:700,margin:0 }}>{report.id} — {getNode(report.projectId,report.nodeId)?.name||'General'}</h3>
                      <div style={{ fontSize:12,color:COLORS.textSecondary,marginTop:4 }}>{getProject(report.projectId)?.code} · {report.week} · {getUser(report.submittedBy).name}</div>
                    </div>
                    <div style={{ display:'flex',gap:6,alignItems:'center' }}>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ fontSize:22,fontWeight:700,color:COLORS.accent }}>{report.progress}%</div>
                        <div style={{ fontSize:10,color:report.progress>(report.prevProgress||0)?COLORS.green:COLORS.textMuted }}>
                          {report.progress>(report.prevProgress||0)?'+':''}{report.progress-(report.prevProgress||0)}% vs last week
                        </div>
                      </div>
                      <StatusBadge status={report.completeness||'Submitted'}/>
                    </div>
                  </div>
                </div>

                {/* Detail Tabs */}
                <div style={{ display:'flex',gap:0,borderBottom:`1px solid ${COLORS.border}`,overflowX:'auto' }}>
                  {['summary','work-packages','blockers','photos','next-week'].map(t=>(
                    <button key={t} onClick={()=>setDetailTab(t)}
                      style={{ padding:'9px 14px',fontSize:11,fontWeight:detailTab===t?600:400,color:detailTab===t?COLORS.accent:COLORS.textSecondary,border:'none',background:'none',cursor:'pointer',borderBottom:detailTab===t?`2px solid ${COLORS.accent}`:'2px solid transparent',whiteSpace:'nowrap',textTransform:'capitalize' }}>
                      {t.replace(/-/g,' ')}
                    </button>
                  ))}
                </div>

                <div style={{ padding:20,maxHeight:400,overflowY:'auto' }}>
                  {detailTab === 'summary' && report.sections && (
                    <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
                      <div style={{ fontSize:13,lineHeight:1.6 }}>{report.summary}</div>
                      {Object.entries(report.sections).map(([key, val]) => {
                        const labels = { completed:'Completed Works', inProgress:'In Progress', blocked:'Blocked', qualityIssues:'Quality Issues', safetyIssues:'Safety Issues', materialShortages:'Material Shortages', subcontractorIssues:'Subcontractor Issues', decisionsNeeded:'Decisions Needed' };
                        const colors = { blocked: COLORS.red, qualityIssues: COLORS.orange, safetyIssues: COLORS.yellow, materialShortages: COLORS.orange };
                        const isEmpty = !val || val === 'None.' || val === 'None';
                        return (
                          <div key={key} style={{ padding:'10px 14px',background: isEmpty?'#FAFAF8':colors[key]?`${colors[key]}08`:'#F0F9FF',borderRadius:6,borderLeft:`3px solid ${isEmpty?COLORS.border:colors[key]||COLORS.accent}` }}>
                            <div style={{ fontSize:11,fontWeight:600,color:colors[key]||COLORS.textSecondary,marginBottom:4,textTransform:'uppercase',letterSpacing:'0.03em' }}>{labels[key]||key}</div>
                            <div style={{ fontSize:12,color: isEmpty?COLORS.textMuted:COLORS.text }}>{val}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {detailTab === 'work-packages' && (
                    <div>
                      <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
                        <thead>
                          <tr style={{ borderBottom:`1px solid ${COLORS.border}` }}>
                            {['Work Package','Planned %','Actual %','Delta','Note','Delay Reason'].map(h=>(
                              <th key={h} style={{ textAlign:'left',padding:'8px 10px',fontWeight:600,color:COLORS.textSecondary,fontSize:11 }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(report.wpProgress||[]).map((wp,i)=>{
                            const delta = wp.actual - wp.planned;
                            return (
                              <tr key={i} style={{ borderBottom:`1px solid ${COLORS.borderLight}` }}>
                                <td style={{ padding:'8px 10px',fontWeight:500 }}>{wp.wp}</td>
                                <td style={{ padding:'8px 10px',textAlign:'center' }}>{wp.planned}%</td>
                                <td style={{ padding:'8px 10px',textAlign:'center',fontWeight:600 }}>{wp.actual}%</td>
                                <td style={{ padding:'8px 10px',textAlign:'center',color:delta<0?COLORS.red:delta>0?COLORS.green:COLORS.textMuted,fontWeight:600 }}>{delta>0?'+':''}{delta}%</td>
                                <td style={{ padding:'8px 10px',color:COLORS.textSecondary }}>{wp.note||'—'}</td>
                                <td style={{ padding:'8px 10px',color:wp.delayReason?COLORS.red:COLORS.textMuted }}>{wp.delayReason||'—'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {detailTab === 'blockers' && (
                    <div>
                      {(report.blockers||[]).length === 0 ? (
                        <div style={{ textAlign:'center',padding:30,color:COLORS.textMuted,fontSize:13 }}>
                          <Check size={24} style={{ color:COLORS.green,marginBottom:8 }}/>
                          <div>No blockers reported this week</div>
                        </div>
                      ) : (
                        <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
                          {(report.blockers||[]).map(b=>(
                            <div key={b.id} style={{ padding:14,borderRadius:8,border:`1px solid ${b.severity==='High'?COLORS.red:COLORS.orange}30`,background:b.severity==='High'?COLORS.redLight:COLORS.orangeLight }}>
                              <div style={{ display:'flex',justifyContent:'space-between',marginBottom:6 }}>
                                <span style={{ fontSize:13,fontWeight:600 }}>{b.id}</span>
                                <div style={{ display:'flex',gap:6 }}>
                                  <StatusBadge status={b.severity} size="xs"/>
                                  <StatusBadge status={b.status} size="xs"/>
                                </div>
                              </div>
                              <div style={{ fontSize:12,marginBottom:8 }}>{b.description}</div>
                              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,fontSize:11 }}>
                                <div><span style={{ color:COLORS.textMuted }}>Type:</span> {b.type}</div>
                                <div><span style={{ color:COLORS.textMuted }}>Owner:</span> {getUser(b.owner).name}</div>
                                <div><span style={{ color:COLORS.textMuted }}>Due:</span> {b.dueDate}</div>
                                <div><span style={{ color:COLORS.textMuted }}>Area:</span> {b.area}</div>
                                {b.linkedRequest && <div><span style={{ color:COLORS.textMuted }}>Linked:</span> <span style={{ color:COLORS.accent,fontWeight:500 }}>{b.linkedRequest}</span></div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {detailTab === 'photos' && (
                    <div>
                      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:10 }}>
                        {(report.photos||[]).map(ph=>(
                          <div key={ph.id} style={{ borderRadius:8,overflow:'hidden',border:`1px solid ${COLORS.border}` }}>
                            <div style={{ height:100,background:`linear-gradient(135deg, #E2E0DB 0%, #D1CFC9 100%)`,display:'flex',alignItems:'center',justifyContent:'center' }}>
                              <Camera size={24} style={{ color:COLORS.textMuted }}/>
                            </div>
                            <div style={{ padding:8 }}>
                              <div style={{ fontSize:11,fontWeight:500,marginBottom:4 }}>{ph.caption}</div>
                              <div style={{ display:'flex',gap:4 }}>
                                <span style={{ fontSize:9,padding:'1px 6px',borderRadius:3,background:photoCategories[ph.category]||COLORS.accent,color:'white',fontWeight:600 }}>{ph.category}</span>
                                <span style={{ fontSize:9,padding:'1px 6px',borderRadius:3,background:'#F3F4F6',color:COLORS.textSecondary }}>{ph.area}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {detailTab === 'next-week' && report.nextWeek && (
                    <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
                      {[
                        { label: 'Planned Works', value: report.nextWeek.planned, icon: ClipboardList, color: COLORS.accent },
                        { label: 'Materials Needed', value: report.nextWeek.materialsNeeded, icon: Package, color: COLORS.orange },
                        { label: 'Labor / Crew Need', value: report.nextWeek.laborNeed, icon: Users, color: COLORS.green },
                        { label: 'Dependency Risks', value: report.nextWeek.risks, icon: AlertTriangle, color: COLORS.red },
                      ].map(item=>(
                        <div key={item.label} style={{ padding:'12px 16px',background:'#FAFAF8',borderRadius:6,borderLeft:`3px solid ${item.color}`,display:'flex',gap:12,alignItems:'flex-start' }}>
                          <item.icon size={16} style={{ color:item.color,marginTop:2,flexShrink:0 }}/>
                          <div>
                            <div style={{ fontSize:11,fontWeight:600,color:COLORS.textSecondary,marginBottom:4 }}>{item.label}</div>
                            <div style={{ fontSize:12 }}>{item.value || '—'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {reportTab === 'new-report' && (
          <div>
            {nrSaved ? (
              <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:40,textAlign:'center' }}>
                <div style={{ width:48,height:48,borderRadius:24,background:COLORS.greenLight,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px' }}>
                  <Check size={24} style={{ color:COLORS.green }}/>
                </div>
                <div style={{ fontSize:18,fontWeight:700,marginBottom:6 }}>Weekly Report Submitted</div>
                <div style={{ fontSize:13,color:COLORS.textSecondary,marginBottom:4 }}>{nrWeek} · {getProject(nrProject)?.code} · {nrSelectedNodeName||'General'}</div>
                <div style={{ fontSize:12,color:COLORS.textMuted,marginBottom:20 }}>Report sent for PM review. {nrPhotos.length} photo(s), {nrFilledWp} work package(s), {nrBlockers.length} blocker(s).</div>
                <div style={{ display:'flex',gap:10,justifyContent:'center' }}>
                  <button onClick={()=>{setNrSaved(false);setNrProgress('');setNrSections({completed:'',inProgress:'',blocked:'',qualityIssues:'',safetyIssues:'',materialShortages:'',subcontractorIssues:'',decisionsNeeded:''});setNrWpRows([{wp:'',planned:'',actual:'',note:'',delayReason:''}]);setNrBlockers([]);setNrPhotos([]);setNrNextWeek({planned:'',materialsNeeded:'',laborNeed:'',risks:''});setNrNodeId('');}}
                    style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 20px',fontSize:13,cursor:'pointer',fontWeight:600 }}>Create Another</button>
                  <button onClick={()=>setReportTab('reports')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'8px 20px',fontSize:13,cursor:'pointer',fontWeight:500 }}>View All Reports</button>
                </div>
              </div>
            ) : (
              <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
                {/* Form Header */}
                <div style={{ padding:'16px 20px',borderBottom:`1px solid ${COLORS.border}`,background:'#FAFAF8' }}>
                  <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:12 }}>
                    <div>
                      <h3 style={{ fontSize:16,fontWeight:700,margin:0 }}>New Weekly Progress Report</h3>
                      <div style={{ fontSize:12,color:COLORS.textSecondary,marginTop:4 }}>Superintendent: <b>{getUser('u5').name}</b></div>
                    </div>
                    <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ fontSize:10,color:COLORS.textMuted,marginBottom:2 }}>Completeness</div>
                        <div style={{ display:'flex',alignItems:'center',gap:6 }}>
                          <div style={{ width:80 }}><ProgressBar value={nrCompleteness} height={5} color={nrCompleteness>=80?COLORS.green:nrCompleteness>=50?COLORS.orange:COLORS.red}/></div>
                          <span style={{ fontSize:12,fontWeight:600,color:nrCompleteness>=80?COLORS.green:nrCompleteness>=50?COLORS.orange:COLORS.red }}>{nrCompleteness}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top fields */}
                  <div style={{ display:'flex',gap:12,marginTop:14,flexWrap:'wrap' }}>
                    <div style={{ display:'flex',flexDirection:'column',gap:3 }}>
                      <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,textTransform:'uppercase',letterSpacing:'0.04em' }}>Reporting Week *</label>
                      <select value={nrWeek} onChange={e=>setNrWeek(e.target.value)}
                        style={{ padding:'7px 10px',border:`1px solid ${COLORS.border}`,borderRadius:5,fontSize:12,outline:'none',background:'white',width:130 }}>
                        <option>W10 2025</option><option>W09 2025</option><option>W08 2025</option>
                      </select>
                    </div>
                    <div style={{ display:'flex',flexDirection:'column',gap:3 }}>
                      <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,textTransform:'uppercase',letterSpacing:'0.04em' }}>Project *</label>
                      <select value={nrProject} onChange={e=>{setNrProject(e.target.value);setNrNodeId('');}}
                        style={{ padding:'7px 10px',border:`1px solid ${COLORS.border}`,borderRadius:5,fontSize:12,outline:'none',background:'white',minWidth:200 }}>
                        {projects.map(p=><option key={p.id} value={p.id}>{p.code} — {p.name.split('–')[0].trim()}</option>)}
                      </select>
                    </div>
                    <div style={{ display:'flex',flexDirection:'column',gap:3 }}>
                      <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,textTransform:'uppercase',letterSpacing:'0.04em' }}>Area / Node *</label>
                      <select value={nrNodeId} onChange={e=>setNrNodeId(e.target.value)}
                        style={{ padding:'7px 10px',border:`1px solid ${nrNodeId?COLORS.border:'#FCA5A5'}`,borderRadius:5,fontSize:12,outline:'none',background:'white',minWidth:180 }}>
                        <option value="">Select area...</option>
                        {nrNodes.map(n=><option key={n.id} value={n.id}>{'\u00A0'.repeat(n.level*2)}{n.name}</option>)}
                      </select>
                    </div>
                    <div style={{ display:'flex',flexDirection:'column',gap:3 }}>
                      <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,textTransform:'uppercase',letterSpacing:'0.04em' }}>Overall Progress % *</label>
                      <input type="number" min="0" max="100" value={nrProgress} onChange={e=>setNrProgress(e.target.value)} placeholder="0–100"
                        style={{ padding:'7px 10px',border:`1px solid ${nrProgress?COLORS.border:'#FCA5A5'}`,borderRadius:5,fontSize:12,outline:'none',background:'white',width:90,fontWeight:600 }}/>
                    </div>
                  </div>
                </div>

                {/* Inner tabs for form sections */}
                <div style={{ display:'flex',gap:0,borderBottom:`1px solid ${COLORS.border}`,overflowX:'auto' }}>
                  {[{id:'sections',label:'Report Sections'},{id:'work-packages',label:'Work Packages'},{id:'blockers',label:`Blockers (${nrBlockers.length})`},{id:'photos',label:`Photos (${nrPhotos.length})`},{id:'next-week',label:'Next Week Plan'}].map(t=>(
                    <button key={t.id} onClick={()=>setNrFormTab(t.id)}
                      style={{ padding:'9px 16px',fontSize:11,fontWeight:nrFormTab===t.id?600:400,color:nrFormTab===t.id?COLORS.accent:COLORS.textSecondary,border:'none',background:'none',cursor:'pointer',borderBottom:nrFormTab===t.id?`2px solid ${COLORS.accent}`:'2px solid transparent',whiteSpace:'nowrap' }}>
                      {t.label}
                    </button>
                  ))}
                </div>

                <div style={{ padding:20,minHeight:300 }}>
                  {/* SECTIONS TAB */}
                  {nrFormTab === 'sections' && (
                    <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
                      {Object.entries(sectionLabels).map(([key, label]) => {
                        const isNeg = ['blocked','qualityIssues','safetyIssues','materialShortages','subcontractorIssues','decisionsNeeded'].includes(key);
                        return (
                          <div key={key}>
                            <label style={{ fontSize:11,fontWeight:600,color:isNeg?COLORS.orange:COLORS.textSecondary,marginBottom:4,display:'block' }}>{label}</label>
                            <textarea value={nrSections[key]} onChange={e=>updateNrSection(key,e.target.value)}
                              placeholder={key==='completed'?'Describe completed works this week...':key==='inProgress'?'Describe works currently in progress...':key==='blocked'?'Any blocked works? Leave empty if none.':'Details or "None"'}
                              rows={2} style={{ width:'100%',padding:'8px 10px',border:`1px solid ${COLORS.border}`,borderRadius:5,fontSize:12,outline:'none',resize:'vertical',fontFamily:'inherit',background:'white',boxSizing:'border-box' }}/>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* WORK PACKAGES TAB */}
                  {nrFormTab === 'work-packages' && (
                    <div>
                      <div style={{ fontSize:12,color:COLORS.textSecondary,marginBottom:12 }}>Report progress for each active work package in this area.</div>
                      <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
                        <thead>
                          <tr style={{ background:'#F5F4F1' }}>
                            {['Work Package *','Planned %','Actual % *','Note','Delay Reason',''].map(h=>(
                              <th key={h} style={{ textAlign:'left',padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}` }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {nrWpRows.map((row, idx) => (
                            <tr key={idx} style={{ borderBottom:`1px solid ${COLORS.borderLight}` }}>
                              <td style={{ padding:'4px 4px' }}>
                                <select value={row.wp} onChange={e=>updateNrWpRow(idx,'wp',e.target.value)}
                                  style={{ width:'100%',padding:'6px 6px',border:`1px solid ${row.wp?COLORS.border:'#FCA5A5'}`,borderRadius:4,fontSize:11,outline:'none',background:'white' }}>
                                  <option value="">Select...</option>
                                  {workPackages.map(wp=><option key={wp} value={wp}>{wp}</option>)}
                                </select>
                              </td>
                              <td style={{ padding:'4px 4px' }}>
                                <input type="number" min="0" max="100" value={row.planned} onChange={e=>updateNrWpRow(idx,'planned',e.target.value)} placeholder="%"
                                  style={{ width:'100%',padding:'6px 6px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:12,outline:'none',textAlign:'center',background:'white',boxSizing:'border-box' }}/>
                              </td>
                              <td style={{ padding:'4px 4px' }}>
                                <input type="number" min="0" max="100" value={row.actual} onChange={e=>updateNrWpRow(idx,'actual',e.target.value)} placeholder="%"
                                  style={{ width:'100%',padding:'6px 6px',border:`1px solid ${row.actual?COLORS.border:'#FCA5A5'}`,borderRadius:4,fontSize:12,outline:'none',textAlign:'center',fontWeight:600,background:'white',boxSizing:'border-box' }}/>
                              </td>
                              <td style={{ padding:'4px 4px' }}>
                                <input value={row.note} onChange={e=>updateNrWpRow(idx,'note',e.target.value)} placeholder="Optional note"
                                  style={{ width:'100%',padding:'6px 6px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:11,outline:'none',background:'white',boxSizing:'border-box' }}/>
                              </td>
                              <td style={{ padding:'4px 4px' }}>
                                <input value={row.delayReason} onChange={e=>updateNrWpRow(idx,'delayReason',e.target.value)} placeholder="If behind..."
                                  style={{ width:'100%',padding:'6px 6px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:11,outline:'none',background:'white',color:row.delayReason?COLORS.red:COLORS.text,boxSizing:'border-box' }}/>
                              </td>
                              <td style={{ padding:'4px 4px',textAlign:'center' }}>
                                <button onClick={()=>removeNrWpRow(idx)} style={{ background:'none',border:`1px solid ${COLORS.border}`,borderRadius:3,padding:'3px 4px',cursor:'pointer' }}><X size={10} style={{ color:COLORS.textMuted }}/></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button onClick={addNrWpRow} style={{ marginTop:8,background:'white',border:`1px dashed ${COLORS.border}`,borderRadius:6,padding:'7px 14px',fontSize:12,cursor:'pointer',fontWeight:500,display:'flex',alignItems:'center',gap:5,color:COLORS.textSecondary }}>
                        <Plus size={13}/>Add Work Package
                      </button>
                    </div>
                  )}

                  {/* BLOCKERS TAB */}
                  {nrFormTab === 'blockers' && (
                    <div>
                      <div style={{ fontSize:12,color:COLORS.textSecondary,marginBottom:12 }}>Report any blockers preventing work progress. Each blocker gets tracked and assigned an owner.</div>
                      {nrBlockers.length === 0 ? (
                        <div style={{ textAlign:'center',padding:30,color:COLORS.textMuted }}>
                          <Check size={24} style={{ color:COLORS.green,marginBottom:8 }}/>
                          <div style={{ fontSize:13 }}>No blockers — great!</div>
                          <div style={{ fontSize:11,marginTop:4 }}>Add one if something is blocking work this week.</div>
                        </div>
                      ) : (
                        <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
                          {nrBlockers.map((b, idx) => (
                            <div key={idx} style={{ padding:14,border:`1px solid ${COLORS.orange}40`,borderRadius:8,background:COLORS.orangeLight }}>
                              <div style={{ display:'flex',justifyContent:'space-between',marginBottom:10 }}>
                                <span style={{ fontSize:12,fontWeight:600 }}>Blocker #{idx+1}</span>
                                <button onClick={()=>removeNrBlocker(idx)} style={{ background:'none',border:'none',cursor:'pointer' }}><X size={14} style={{ color:COLORS.textMuted }}/></button>
                              </div>
                              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8 }}>
                                <div>
                                  <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,display:'block',marginBottom:3 }}>Type</label>
                                  <select value={b.type} onChange={e=>updateNrBlocker(idx,'type',e.target.value)}
                                    style={{ width:'100%',padding:'6px 8px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:11,outline:'none',background:'white',boxSizing:'border-box' }}>
                                    {['Material Delay','Material Shortage','Design Issue','Subcontractor Delay','Client Decision','Access Issue','Weather','Other'].map(t=><option key={t}>{t}</option>)}
                                  </select>
                                </div>
                                <div>
                                  <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,display:'block',marginBottom:3 }}>Severity</label>
                                  <select value={b.severity} onChange={e=>updateNrBlocker(idx,'severity',e.target.value)}
                                    style={{ width:'100%',padding:'6px 8px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:11,outline:'none',background:'white',boxSizing:'border-box' }}>
                                    {['Low','Medium','High','Critical'].map(s=><option key={s}>{s}</option>)}
                                  </select>
                                </div>
                                <div>
                                  <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,display:'block',marginBottom:3 }}>Owner</label>
                                  <select value={b.owner} onChange={e=>updateNrBlocker(idx,'owner',e.target.value)}
                                    style={{ width:'100%',padding:'6px 8px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:11,outline:'none',background:'white',boxSizing:'border-box' }}>
                                    {users.map(u=><option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
                                  </select>
                                </div>
                                <div>
                                  <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,display:'block',marginBottom:3 }}>Resolution Due</label>
                                  <input type="date" value={b.dueDate} onChange={e=>updateNrBlocker(idx,'dueDate',e.target.value)}
                                    style={{ width:'100%',padding:'6px 8px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:11,outline:'none',background:'white',boxSizing:'border-box' }}/>
                                </div>
                              </div>
                              <div>
                                <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,display:'block',marginBottom:3 }}>Description *</label>
                                <textarea value={b.description} onChange={e=>updateNrBlocker(idx,'description',e.target.value)} rows={2} placeholder="Describe the blocker and its impact on work..."
                                  style={{ width:'100%',padding:'8px 10px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:12,outline:'none',resize:'vertical',fontFamily:'inherit',background:'white',boxSizing:'border-box' }}/>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <button onClick={addNrBlocker} style={{ marginTop:12,background:'white',border:`1px dashed ${COLORS.orange}`,borderRadius:6,padding:'8px 16px',fontSize:12,cursor:'pointer',fontWeight:500,color:COLORS.orange,display:'flex',alignItems:'center',gap:5 }}>
                        <AlertTriangle size={13}/>Add Blocker
                      </button>
                    </div>
                  )}

                  {/* PHOTOS TAB */}
                  {nrFormTab === 'photos' && (
                    <div>
                      <div style={{ fontSize:12,color:COLORS.textSecondary,marginBottom:12 }}>Attach photos as evidence of progress, issues, quality, or safety. Add captions and tags for each.</div>
                      {nrPhotos.length > 0 && (
                        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:10,marginBottom:12 }}>
                          {nrPhotos.map((ph, idx) => (
                            <div key={idx} style={{ border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
                              <div style={{ height:80,background:'linear-gradient(135deg,#E2E0DB 0%,#D1CFC9 100%)',display:'flex',alignItems:'center',justifyContent:'center',position:'relative' }}>
                                <Camera size={20} style={{ color:COLORS.textMuted }}/>
                                <button onClick={()=>removeNrPhoto(idx)} style={{ position:'absolute',top:4,right:4,background:'rgba(0,0,0,0.5)',border:'none',borderRadius:3,padding:'2px 4px',cursor:'pointer' }}>
                                  <X size={10} style={{ color:'white' }}/>
                                </button>
                              </div>
                              <div style={{ padding:8,display:'flex',flexDirection:'column',gap:4 }}>
                                <input value={ph.caption} onChange={e=>updateNrPhoto(idx,'caption',e.target.value)} placeholder="Caption..."
                                  style={{ width:'100%',padding:'5px 6px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:11,outline:'none',background:'white',boxSizing:'border-box' }}/>
                                <div style={{ display:'flex',gap:4 }}>
                                  <select value={ph.category} onChange={e=>updateNrPhoto(idx,'category',e.target.value)}
                                    style={{ flex:1,padding:'4px 6px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:10,outline:'none',background:'white' }}>
                                    {['Progress','Issue','Quality','Safety','Delivery'].map(c=><option key={c}>{c}</option>)}
                                  </select>
                                  <input value={ph.area} onChange={e=>updateNrPhoto(idx,'area',e.target.value)} placeholder="Area"
                                    style={{ flex:1,padding:'4px 6px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:10,outline:'none',background:'white',boxSizing:'border-box' }}/>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <button onClick={addNrPhoto} style={{ width:'100%',background:'white',border:`1px dashed ${COLORS.border}`,borderRadius:6,padding:'16px',fontSize:12,cursor:'pointer',color:COLORS.textSecondary,display:'flex',flexDirection:'column',alignItems:'center',gap:6 }}>
                        <Camera size={20}/>
                        <span style={{ fontWeight:500 }}>Take Photo or Upload</span>
                        <span style={{ fontSize:10,color:COLORS.textMuted }}>Progress, issues, quality evidence, safety observations</span>
                      </button>
                    </div>
                  )}

                  {/* NEXT WEEK TAB */}
                  {nrFormTab === 'next-week' && (
                    <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                      {[
                        { key:'planned', label:'Planned Works for Next Week *', placeholder:'What work packages will be active next week? What are the targets?', icon:ClipboardList, color:COLORS.accent },
                        { key:'materialsNeeded', label:'Materials Needed', placeholder:'List materials that need to be on site for next week\'s work...', icon:Package, color:COLORS.orange },
                        { key:'laborNeed', label:'Labor / Crew Requirement', placeholder:'How many workers/crews are needed? Any special trades?', icon:Users, color:COLORS.green },
                        { key:'risks', label:'Dependency Risks', placeholder:'Any risks that could delay next week? Pending decisions, deliveries, weather?', icon:AlertTriangle, color:COLORS.red },
                      ].map(item=>(
                        <div key={item.key} style={{ borderLeft:`3px solid ${item.color}`,paddingLeft:14 }}>
                          <div style={{ display:'flex',alignItems:'center',gap:6,marginBottom:6 }}>
                            <item.icon size={14} style={{ color:item.color }}/>
                            <label style={{ fontSize:11,fontWeight:600,color:COLORS.textSecondary }}>{item.label}</label>
                          </div>
                          <textarea value={nrNextWeek[item.key]} onChange={e=>setNrNextWeek({...nrNextWeek,[item.key]:e.target.value})} rows={2} placeholder={item.placeholder}
                            style={{ width:'100%',padding:'8px 10px',border:`1px solid ${COLORS.border}`,borderRadius:5,fontSize:12,outline:'none',resize:'vertical',fontFamily:'inherit',background:'white',boxSizing:'border-box' }}/>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div style={{ padding:'12px 20px',borderTop:`1px solid ${COLORS.border}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10 }}>
                  <div style={{ fontSize:11,color:COLORS.textMuted }}>
                    {nrFilledSections}/8 sections · {nrFilledWp} work packages · {nrBlockers.length} blockers · {nrPhotos.length} photos
                  </div>
                  <div style={{ display:'flex',gap:8 }}>
                    <button onClick={()=>showToast('Draft saved')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'8px 16px',fontSize:12,cursor:'pointer',fontWeight:500 }}>Save Draft</button>
                    <button onClick={()=>{ if(nrNodeId && nrProgress){ setNrSaved(true); showToast('Weekly report submitted'); }else{ showToast('Please fill project, area, and progress'); } }}
                      style={{ background:nrNodeId&&nrProgress?COLORS.accent:'#CBD5E1',color:'white',border:'none',borderRadius:6,padding:'8px 20px',fontSize:13,cursor:nrNodeId&&nrProgress?'pointer':'not-allowed',fontWeight:600,display:'flex',alignItems:'center',gap:5 }}>
                      <Send size={13}/>Submit Report
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {reportTab === 'blockers' && (
          <div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16 }}>
              {['Open','In Progress','Resolved'].map(status => {
                const items = status === 'Open' ? allBlockers.filter(b=>b.status==='Open') : status === 'Resolved' ? [] : [];
                return (
                  <div key={status} style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,minHeight:300 }}>
                    <div style={{ padding:'12px 16px',borderBottom:`1px solid ${COLORS.border}`,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                      <span style={{ fontSize:13,fontWeight:600 }}>{status}</span>
                      <span style={{ fontSize:11,color:COLORS.textMuted,background:'#F3F4F6',padding:'2px 8px',borderRadius:10 }}>{items.length}</span>
                    </div>
                    <div style={{ padding:12,display:'flex',flexDirection:'column',gap:8 }}>
                      {items.length === 0 ? (
                        <div style={{ textAlign:'center',padding:20,color:COLORS.textMuted,fontSize:12 }}>
                          {status === 'Open' ? 'No open blockers' : `No ${status.toLowerCase()} items`}
                        </div>
                      ) : items.map(b=>(
                        <div key={b.id} style={{ padding:12,borderRadius:6,border:`1px solid ${b.severity==='High'?COLORS.red:COLORS.orange}40`,background:b.severity==='High'?COLORS.redLight:COLORS.orangeLight }}>
                          <div style={{ display:'flex',justifyContent:'space-between',marginBottom:4 }}>
                            <span style={{ fontSize:12,fontWeight:600 }}>{b.id}</span>
                            <StatusBadge status={b.severity} size="xs"/>
                          </div>
                          <div style={{ fontSize:11,marginBottom:6 }}>{b.description}</div>
                          <div style={{ fontSize:10,color:COLORS.textSecondary }}>
                            {getProject(b.projectId)?.code} · {getNode(b.projectId,b.nodeId)?.name||'—'} · Owner: {getUser(b.owner).name}
                          </div>
                          <div style={{ display:'flex',justifyContent:'space-between',marginTop:6,fontSize:10 }}>
                            <span style={{ color:COLORS.textMuted }}>Due: {b.dueDate}</span>
                            {b.linkedRequest && <span style={{ color:COLORS.accent,fontWeight:500 }}>Linked: {b.linkedRequest}</span>}
                          </div>
                          <div style={{ display:'flex',gap:6,marginTop:8 }}>
                            <button onClick={()=>showToast(`${b.id} resolved`)} style={{ background:COLORS.green,color:'white',border:'none',borderRadius:4,padding:'4px 10px',fontSize:10,cursor:'pointer',fontWeight:600 }}>Resolve</button>
                            <button onClick={()=>showToast(`${b.id} assigned`)} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:4,padding:'4px 10px',fontSize:10,cursor:'pointer' }}>Reassign</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================================
  // PAGE: Timesheets (New Enhanced)
  // ============================================================
  const TimesheetsPage = () => {
    const [tsTab, setTsTab] = useState('daily');
    const [tsProject, setTsProject] = useState('all');

    // Batch entry state
    const emptyRow = { project:'p2', nodeId:'', worker:'', workerType:'Employee', activity:'', hours:'', outputQty:'', outputUnit:'sqm', remarks:'' };
    const [batchRows, setBatchRows] = useState([
      { ...emptyRow, nodeId:'n7', worker:'Armen K.', activity:'Gypsum Board Installation', hours:8, outputQty:18, outputUnit:'sqm' },
      { ...emptyRow, nodeId:'n7', worker:'Hakob S.', activity:'Gypsum Board Installation', hours:8, outputQty:16, outputUnit:'sqm' },
      { ...emptyRow, nodeId:'n8', worker:'Mher V.', activity:'Stud Framing', hours:7, outputQty:24, outputUnit:'lm' },
      { ...emptyRow, nodeId:'n8', worker:'ElectriQ Crew A', workerType:'Subcontractor', activity:'Cable Pulling', hours:8, outputQty:14, outputUnit:'point' },
      { ...emptyRow, nodeId:'n14', worker:'Sargis T.', activity:'Tile Laying', hours:8, outputQty:12, outputUnit:'sqm' },
      { ...emptyRow },
    ]);
    const [batchDate, setBatchDate] = useState('2025-03-10');
    const [batchProject, setBatchProject] = useState('p2');
    const [batchSaved, setBatchSaved] = useState(false);

    const batchNodes = projectNodes[batchProject] || [];
    const allWorkers = ['Armen K.','Hakob S.','Mher V.','Sargis T.','Vahan A.','ElectriQ Crew A','PipeWorks Crew','GlassLine Team'];
    const allActivities = ['Stud Framing','Gypsum Board Installation','Taping / Jointing','Painting First Coat','Painting Final Coat','Tile Laying','Cable Pulling','Conduit Installation','Ceiling Grid Installation','Flooring Installation','Door Installation','Glass Partition Install','Plumbing Rough-In','Skirting / Trim'];
    const activityUnits = { 'Stud Framing':'lm','Gypsum Board Installation':'sqm','Taping / Jointing':'sqm','Painting First Coat':'sqm','Painting Final Coat':'sqm','Tile Laying':'sqm','Cable Pulling':'point','Conduit Installation':'meter','Ceiling Grid Installation':'sqm','Flooring Installation':'sqm','Door Installation':'pcs','Glass Partition Install':'module','Plumbing Rough-In':'point','Skirting / Trim':'lm' };

    const updateBatchRow = (idx, field, value) => {
      const next = [...batchRows];
      next[idx] = { ...next[idx], [field]: value };
      if (field === 'activity' && activityUnits[value]) {
        next[idx].outputUnit = activityUnits[value];
      }
      if (field === 'worker') {
        next[idx].workerType = ['ElectriQ Crew A','PipeWorks Crew','GlassLine Team'].includes(value) ? 'Subcontractor' : 'Employee';
      }
      setBatchRows(next);
    };
    const addBatchRow = () => setBatchRows([...batchRows, { ...emptyRow }]);
    const removeBatchRow = (idx) => { if (batchRows.length > 1) setBatchRows(batchRows.filter((_,i)=>i!==idx)); };
    const copyPrevRow = (idx) => { if (idx > 0) { const next = [...batchRows]; next[idx] = { ...next[idx-1], worker:'', hours:'', outputQty:'', remarks:'' }; setBatchRows(next); } };

    const batchFilledRows = batchRows.filter(r=>r.worker && r.activity && r.hours);
    const batchTotalHours = batchFilledRows.reduce((s,r)=>s+(parseFloat(r.hours)||0),0);
    const batchTotalOutput = batchFilledRows.reduce((s,r)=>s+(parseFloat(r.outputQty)||0),0);

    const filtered = tsProject === 'all' ? laborEntries : laborEntries.filter(e=>e.projectId===tsProject);
    const totalHours = filtered.reduce((s,e)=>s+e.hours,0);
    const totalCost = filtered.reduce((s,e)=>s+e.costAmount,0);
    const totalOutput = filtered.reduce((s,e)=>s+e.outputQty,0);
    const avgProductivity = filtered.length > 0 ? filtered.reduce((s,e)=>s+e.actualProductivity,0) / filtered.length : 0;
    const anomalyCount = filtered.filter(e=>e.anomalies.length>0).length;
    const belowTarget = filtered.filter(e=>e.productivityStatus!=='On Target').length;

    // Productivity summary by activity
    const prodByActivity = {};
    filtered.forEach(e => {
      if (!prodByActivity[e.activity]) prodByActivity[e.activity] = { hours: 0, output: 0, budget: e.budgetProductivity, count: 0 };
      prodByActivity[e.activity].hours += e.hours;
      prodByActivity[e.activity].output += e.outputQty;
      prodByActivity[e.activity].count++;
    });

    return (
      <div>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16 }}>
          <div>
            <h1 style={{ fontSize:22,fontWeight:700,color:COLORS.text,margin:0 }}>Timesheets & Labor</h1>
            <p style={{ fontSize:13,color:COLORS.textSecondary,margin:'4px 0 0' }}>{laborEntries.length} entries · {totalHours} hours recorded</p>
          </div>
          <div style={{ display:'flex',gap:8 }}>
            <select value={tsProject} onChange={e=>setTsProject(e.target.value)}
              style={{ padding:'8px 12px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:12,outline:'none',background:'white' }}>
              <option value="all">All Projects</option>
              {projects.map(p=><option key={p.id} value={p.id}>{p.code}</option>)}
            </select>
            <button onClick={()=>{ setTsTab('new-entry'); setBatchSaved(false); }} style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 16px',fontSize:13,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:6 }}>
              <Plus size={14}/>New Timesheet
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))',gap:10,marginBottom:16 }}>
          <KpiCard label="Total Hours" value={totalHours} icon={Clock} color={COLORS.accent}/>
          <KpiCard label="Total Cost" value={fmt(totalCost)} icon={DollarSign} color={COLORS.green}/>
          <KpiCard label="Total Output" value={totalOutput} icon={TrendingUp} sub="mixed units"/>
          <KpiCard label="Below Target" value={belowTarget} icon={TrendingDown} color={COLORS.orange}/>
          <KpiCard label="Anomalies" value={anomalyCount} icon={AlertTriangle} color={COLORS.red}/>
          <KpiCard label="Pending Review" value={filtered.filter(e=>e.approvalStatus==='Submitted').length} icon={Clock} color={COLORS.yellow}/>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex',gap:0,borderBottom:`1px solid ${COLORS.border}`,marginBottom:16 }}>
          {[{id:'daily',label:'Daily Entries'},{id:'new-entry',label:'New Timesheet'},{id:'productivity',label:'Productivity'},{id:'attendance',label:'Attendance'},{id:'approval',label:'Approval Status'}].map(t=>(
            <button key={t.id} onClick={()=>setTsTab(t.id)}
              style={{ padding:'10px 18px',fontSize:12,fontWeight:tsTab===t.id?600:400,color:tsTab===t.id?COLORS.accent:COLORS.textSecondary,border:'none',background:'none',cursor:'pointer',borderBottom:tsTab===t.id?`2px solid ${COLORS.accent}`:'2px solid transparent' }}>
              {t.label}
            </button>
          ))}
        </div>

        {tsTab === 'daily' && (
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12,minWidth:1100 }}>
                <thead>
                  <tr style={{ background:'#FAFAF8' }}>
                    {['Date','Project','Node','Worker','Type','Activity','Hours','Output','Unit','Rate','Cost','Prod (hr/unit)','Budget','Status','Flags'].map(h=>(
                      <th key={h} style={{ textAlign:'left',padding:'8px 10px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`1px solid ${COLORS.border}`,whiteSpace:'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice(0,25).map(le=>(
                    <tr key={le.id} style={{ borderBottom:`1px solid ${COLORS.borderLight}`,background:le.anomalies.length>0?'#FEF2F208':'transparent' }}>
                      <td style={{ padding:'8px 10px' }}>{le.date}</td>
                      <td style={{ padding:'8px 10px',color:COLORS.accent,fontWeight:500 }}>{getProject(le.projectId)?.code}</td>
                      <td style={{ padding:'8px 10px' }}>{getNode(le.projectId,le.nodeId)?.name||'—'}</td>
                      <td style={{ padding:'8px 10px',fontWeight:500 }}>{le.worker}</td>
                      <td style={{ padding:'8px 10px' }}>
                        <span style={{ fontSize:10,padding:'1px 6px',borderRadius:3,background:le.workerType==='Employee'?'#DBEAFE':'#E0E7FF',color:le.workerType==='Employee'?'#1D4ED8':'#3730A3' }}>{le.workerType}</span>
                      </td>
                      <td style={{ padding:'8px 10px',color:COLORS.textSecondary }}>{le.activity}</td>
                      <td style={{ padding:'8px 10px',fontWeight:600 }}>{le.hours}h</td>
                      <td style={{ padding:'8px 10px',fontWeight:600 }}>{le.outputQty}</td>
                      <td style={{ padding:'8px 10px',color:COLORS.textMuted }}>{le.outputUnit}</td>
                      <td style={{ padding:'8px 10px',color:COLORS.textMuted }}>{le.hourlyRate.toLocaleString()} ֏</td>
                      <td style={{ padding:'8px 10px',fontWeight:500 }}>{le.costAmount.toLocaleString()} ֏</td>
                      <td style={{ padding:'8px 10px',fontWeight:600,color:le.productivityStatus==='On Target'?COLORS.green:le.productivityStatus==='Below Target'?COLORS.orange:COLORS.red }}>{le.actualProductivity}</td>
                      <td style={{ padding:'8px 10px',color:COLORS.textMuted }}>{le.budgetProductivity}</td>
                      <td style={{ padding:'8px 10px' }}><StatusBadge status={le.approvalStatus} size="xs"/></td>
                      <td style={{ padding:'8px 10px' }}>
                        {le.anomalies.length > 0 ? le.anomalies.map((a,i)=>(
                          <span key={i} style={{ fontSize:9,padding:'1px 5px',borderRadius:3,background:COLORS.redLight,color:COLORS.red,fontWeight:600,display:'block',marginBottom:2 }}>{a}</span>
                        )) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tsTab === 'productivity' && (
          <div>
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden',marginBottom:16 }}>
              <div style={{ padding:'12px 16px',borderBottom:`1px solid ${COLORS.border}`,fontSize:13,fontWeight:600 }}>Productivity by Activity — Budget vs Actual</div>
              <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
                <thead>
                  <tr style={{ background:'#FAFAF8' }}>
                    {['Activity','Total Hours','Total Output','Actual (hr/unit)','Budget (hr/unit)','Variance','Status'].map(h=>(
                      <th key={h} style={{ textAlign:'left',padding:'10px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(prodByActivity).map(([act, data]) => {
                    const actual = data.output > 0 ? data.hours / data.output : 0;
                    const variance = data.budget > 0 ? ((actual / data.budget - 1) * 100) : 0;
                    const status = variance <= 10 ? 'On Target' : variance <= 30 ? 'Below Target' : 'Critical';
                    return (
                      <tr key={act} style={{ borderBottom:`1px solid ${COLORS.borderLight}` }}>
                        <td style={{ padding:'10px 12px',fontWeight:500 }}>{act}</td>
                        <td style={{ padding:'10px 12px' }}>{data.hours}h</td>
                        <td style={{ padding:'10px 12px' }}>{data.output}</td>
                        <td style={{ padding:'10px 12px',fontWeight:600 }}>{actual.toFixed(2)}</td>
                        <td style={{ padding:'10px 12px',color:COLORS.textMuted }}>{data.budget.toFixed(2)}</td>
                        <td style={{ padding:'10px 12px',fontWeight:600,color:variance>10?COLORS.red:variance>0?COLORS.orange:COLORS.green }}>{variance>0?'+':''}{variance.toFixed(1)}%</td>
                        <td style={{ padding:'10px 12px' }}>
                          <span style={{ fontSize:11,padding:'2px 8px',borderRadius:4,fontWeight:600,background:status==='On Target'?COLORS.greenLight:status==='Below Target'?COLORS.orangeLight:COLORS.redLight,color:status==='On Target'?COLORS.green:status==='Below Target'?COLORS.orange:COLORS.red }}>{status}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bar Chart */}
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:20 }}>
              <h3 style={{ fontSize:14,fontWeight:600,margin:'0 0 16px' }}>Hours by Activity</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={Object.entries(prodByActivity).map(([k,v])=>({name:k.split(' ').slice(0,2).join(' '),hours:v.hours,output:v.output}))}>
                  <XAxis dataKey="name" tick={{ fontSize:10 }} angle={-20} textAnchor="end" height={50}/>
                  <YAxis tick={{ fontSize:10 }}/>
                  <Tooltip/>
                  <Bar dataKey="hours" fill={COLORS.accent} name="Hours" radius={[3,3,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {tsTab === 'attendance' && (
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
            <div style={{ padding:'12px 16px',borderBottom:`1px solid ${COLORS.border}`,fontSize:13,fontWeight:600 }}>Attendance Summary — Current Week</div>
            <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
              <thead>
                <tr style={{ background:'#FAFAF8' }}>
                  {['Worker','Type','Crew','Mon','Tue','Wed','Thu','Fri','Sat','Total Hours'].map(h=>(
                    <th key={h} style={{ textAlign:'center',padding:'8px 10px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from(new Set(filtered.map(e=>e.worker))).slice(0,10).map(worker => {
                  const entries = filtered.filter(e=>e.worker===worker);
                  const workerInfo = entries[0];
                  const dayMap = {};
                  entries.forEach(e => { dayMap[e.date] = { hours: e.hours, attendance: e.attendance }; });
                  const dates = ['2025-03-03','2025-03-04','2025-03-05','2025-03-06','2025-03-07','2025-03-08'];
                  const total = entries.reduce((s,e)=>s+e.hours,0);
                  return (
                    <tr key={worker} style={{ borderBottom:`1px solid ${COLORS.borderLight}` }}>
                      <td style={{ padding:'8px 10px',fontWeight:500,textAlign:'left' }}>{worker}</td>
                      <td style={{ padding:'8px 10px',textAlign:'center' }}>
                        <span style={{ fontSize:10,padding:'1px 6px',borderRadius:3,background:workerInfo.workerType==='Employee'?'#DBEAFE':'#E0E7FF',color:workerInfo.workerType==='Employee'?'#1D4ED8':'#3730A3' }}>{workerInfo.workerType}</span>
                      </td>
                      <td style={{ padding:'8px 10px',textAlign:'center',fontSize:11,color:COLORS.textSecondary }}>{workerInfo.crew||'—'}</td>
                      {dates.map(d => {
                        const day = dayMap[d];
                        return (
                          <td key={d} style={{ padding:'8px 10px',textAlign:'center' }}>
                            {day ? (
                              <div>
                                <div style={{ fontWeight:600,fontSize:12 }}>{day.hours}h</div>
                                <div style={{ fontSize:9,color:day.attendance==='Present'?COLORS.green:day.attendance==='Late'?COLORS.orange:COLORS.red }}>{day.attendance}</div>
                              </div>
                            ) : <span style={{ color:COLORS.textMuted }}>—</span>}
                          </td>
                        );
                      })}
                      <td style={{ padding:'8px 10px',textAlign:'center',fontWeight:700 }}>{total}h</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {tsTab === 'approval' && (
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
            <div style={{ padding:'12px 16px',borderBottom:`1px solid ${COLORS.border}`,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
              <span style={{ fontSize:13,fontWeight:600 }}>Timesheet Approval Status</span>
              <div style={{ display:'flex',gap:8 }}>
                <button onClick={()=>showToast('All submitted entries approved')} style={{ background:COLORS.green,color:'white',border:'none',borderRadius:6,padding:'6px 14px',fontSize:12,cursor:'pointer',fontWeight:500 }}>Approve All Submitted</button>
              </div>
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:0,borderBottom:`1px solid ${COLORS.border}` }}>
              {['Draft','Submitted','Reviewed','Approved','Disputed'].map(s=>{
                const count = filtered.filter(e=>e.approvalStatus===s).length;
                const colors = { Draft:'#9CA3AF', Submitted:'#3730A3', Reviewed:'#1D4ED8', Approved:'#065F46', Disputed:'#991B1B' };
                return (
                  <div key={s} style={{ padding:16,textAlign:'center',borderRight:`1px solid ${COLORS.border}` }}>
                    <div style={{ fontSize:22,fontWeight:700,color:colors[s] }}>{count}</div>
                    <div style={{ fontSize:11,color:COLORS.textSecondary }}>{s}</div>
                  </div>
                );
              })}
            </div>
            <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
              <thead>
                <tr style={{ background:'#FAFAF8' }}>
                  {['ID','Date','Worker','Activity','Hours','Output','Cost','Status','Action'].map(h=>(
                    <th key={h} style={{ textAlign:'left',padding:'8px 10px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.filter(e=>e.approvalStatus!=='Approved').slice(0,15).map(le=>(
                  <tr key={le.id} style={{ borderBottom:`1px solid ${COLORS.borderLight}` }}>
                    <td style={{ padding:'8px 10px',fontWeight:500,color:COLORS.textMuted }}>{le.id}</td>
                    <td style={{ padding:'8px 10px' }}>{le.date}</td>
                    <td style={{ padding:'8px 10px',fontWeight:500 }}>{le.worker}</td>
                    <td style={{ padding:'8px 10px',color:COLORS.textSecondary }}>{le.activity}</td>
                    <td style={{ padding:'8px 10px',fontWeight:600 }}>{le.hours}h</td>
                    <td style={{ padding:'8px 10px' }}>{le.outputQty} {le.outputUnit}</td>
                    <td style={{ padding:'8px 10px' }}>{le.costAmount.toLocaleString()} ֏</td>
                    <td style={{ padding:'8px 10px' }}><StatusBadge status={le.approvalStatus} size="xs"/></td>
                    <td style={{ padding:'8px 10px' }}>
                      <div style={{ display:'flex',gap:4 }}>
                        <button onClick={()=>showToast(`${le.id} approved`)} style={{ background:COLORS.green,color:'white',border:'none',borderRadius:3,padding:'3px 8px',fontSize:10,cursor:'pointer' }}>Approve</button>
                        <button onClick={()=>showToast(`${le.id} disputed`)} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:3,padding:'3px 8px',fontSize:10,cursor:'pointer' }}>Dispute</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tsTab === 'new-entry' && (
          <div>
            {batchSaved ? (
              <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:40,textAlign:'center' }}>
                <div style={{ width:48,height:48,borderRadius:24,background:COLORS.greenLight,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px' }}>
                  <Check size={24} style={{ color:COLORS.green }}/>
                </div>
                <div style={{ fontSize:18,fontWeight:700,marginBottom:6 }}>Timesheet Submitted</div>
                <div style={{ fontSize:13,color:COLORS.textSecondary,marginBottom:4 }}>{batchFilledRows.length} entries · {batchTotalHours} hours · {batchDate}</div>
                <div style={{ fontSize:12,color:COLORS.textMuted,marginBottom:20 }}>Sent for PM review. Workers will be notified once approved for payroll.</div>
                <div style={{ display:'flex',gap:10,justifyContent:'center' }}>
                  <button onClick={()=>{ setBatchSaved(false); setBatchRows([{ ...emptyRow }]); }} style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 20px',fontSize:13,cursor:'pointer',fontWeight:600 }}>Create Another</button>
                  <button onClick={()=>setTsTab('daily')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'8px 20px',fontSize:13,cursor:'pointer',fontWeight:500 }}>View All Entries</button>
                </div>
              </div>
            ) : (
              <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
                {/* Form Header */}
                <div style={{ padding:'16px 20px',borderBottom:`1px solid ${COLORS.border}`,background:'#FAFAF8' }}>
                  <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:12 }}>
                    <div>
                      <h3 style={{ fontSize:16,fontWeight:700,margin:0 }}>New Timesheet Report</h3>
                      <div style={{ fontSize:12,color:COLORS.textSecondary,marginTop:4 }}>Fill in daily labor and output data. Each row = one worker or crew for one activity.</div>
                    </div>
                    {batchFilledRows.length > 0 && (
                      <div style={{ fontSize:11,color:COLORS.textSecondary,textAlign:'right' }}>
                        <span style={{ fontWeight:600,color:COLORS.text }}>{batchFilledRows.length}</span> rows · <span style={{ fontWeight:600,color:COLORS.text }}>{batchTotalHours}</span> hrs · <span style={{ fontWeight:600,color:COLORS.text }}>{batchTotalOutput}</span> output units
                      </div>
                    )}
                  </div>

                  {/* Top fields: Date + Project */}
                  <div style={{ display:'flex',gap:12,marginTop:14,flexWrap:'wrap' }}>
                    <div style={{ display:'flex',flexDirection:'column',gap:3 }}>
                      <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,textTransform:'uppercase',letterSpacing:'0.04em' }}>Date</label>
                      <input type="date" value={batchDate} onChange={e=>setBatchDate(e.target.value)}
                        style={{ padding:'7px 10px',border:`1px solid ${COLORS.border}`,borderRadius:5,fontSize:12,outline:'none',background:'white',width:150 }}/>
                    </div>
                    <div style={{ display:'flex',flexDirection:'column',gap:3 }}>
                      <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,textTransform:'uppercase',letterSpacing:'0.04em' }}>Project</label>
                      <select value={batchProject} onChange={e=>{ setBatchProject(e.target.value); setBatchRows(batchRows.map(r=>({...r,project:e.target.value,nodeId:''}))); }}
                        style={{ padding:'7px 10px',border:`1px solid ${COLORS.border}`,borderRadius:5,fontSize:12,outline:'none',background:'white',minWidth:220 }}>
                        {projects.map(p=><option key={p.id} value={p.id}>{p.code} — {p.name.split('–')[0].trim()}</option>)}
                      </select>
                    </div>
                    <div style={{ display:'flex',flexDirection:'column',gap:3,justifyContent:'flex-end' }}>
                      <div style={{ fontSize:10,color:COLORS.textMuted }}>Superintendent: <b>{getUser('u5').name}</b></div>
                    </div>
                  </div>
                </div>

                {/* Batch Entry Grid */}
                <div style={{ overflowX:'auto' }}>
                  <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12,minWidth:950 }}>
                    <thead>
                      <tr style={{ background:'#F5F4F1' }}>
                        <th style={{ padding:'8px 6px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,width:28,textAlign:'center' }}>#</th>
                        <th style={{ padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,minWidth:140 }}>Area / Node *</th>
                        <th style={{ padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,minWidth:130 }}>Worker / Crew *</th>
                        <th style={{ padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,width:80 }}>Type</th>
                        <th style={{ padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,minWidth:150 }}>Activity *</th>
                        <th style={{ padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,width:65,textAlign:'center' }}>Hours *</th>
                        <th style={{ padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,width:65,textAlign:'center' }}>Output</th>
                        <th style={{ padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,width:50 }}>Unit</th>
                        <th style={{ padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,minWidth:100 }}>Remarks</th>
                        <th style={{ padding:'8px 6px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,width:50 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {batchRows.map((row, idx) => {
                        const isComplete = row.worker && row.activity && row.hours;
                        const isEmpty = !row.worker && !row.activity && !row.hours;
                        return (
                          <tr key={idx} style={{ borderBottom:`1px solid ${COLORS.borderLight}`,background: isComplete?'#F0FDF406':'transparent' }}>
                            <td style={{ padding:'6px 6px',textAlign:'center',color:COLORS.textMuted,fontSize:10 }}>{idx+1}</td>
                            <td style={{ padding:'4px 4px' }}>
                              <select value={row.nodeId} onChange={e=>updateBatchRow(idx,'nodeId',e.target.value)}
                                style={{ width:'100%',padding:'6px 6px',border:`1px solid ${row.nodeId?COLORS.border:'#FCA5A5'}`,borderRadius:4,fontSize:11,outline:'none',background:'white',color:row.nodeId?COLORS.text:COLORS.textMuted }}>
                                <option value="">Select area...</option>
                                {batchNodes.map(n=><option key={n.id} value={n.id}>{'\u00A0'.repeat(n.level*2)}{n.name}</option>)}
                              </select>
                            </td>
                            <td style={{ padding:'4px 4px' }}>
                              <select value={row.worker} onChange={e=>updateBatchRow(idx,'worker',e.target.value)}
                                style={{ width:'100%',padding:'6px 6px',border:`1px solid ${row.worker?COLORS.border:'#FCA5A5'}`,borderRadius:4,fontSize:11,outline:'none',background:'white',color:row.worker?COLORS.text:COLORS.textMuted }}>
                                <option value="">Select worker...</option>
                                <optgroup label="Employees">
                                  {allWorkers.filter(w=>!w.includes('Crew')&&!w.includes('Team')).map(w=><option key={w} value={w}>{w}</option>)}
                                </optgroup>
                                <optgroup label="Subcontractor Crews">
                                  {allWorkers.filter(w=>w.includes('Crew')||w.includes('Team')).map(w=><option key={w} value={w}>{w}</option>)}
                                </optgroup>
                              </select>
                            </td>
                            <td style={{ padding:'4px 8px' }}>
                              <span style={{ fontSize:10,fontWeight:600,padding:'3px 7px',borderRadius:4,display:'inline-block',background:row.workerType==='Subcontractor'?'#E0E7FF':'#DBEAFE',color:row.workerType==='Subcontractor'?'#3730A3':'#1D4ED8' }}>
                                {row.workerType==='Subcontractor'?'SubCo':'Empl'}
                              </span>
                            </td>
                            <td style={{ padding:'4px 4px' }}>
                              <select value={row.activity} onChange={e=>updateBatchRow(idx,'activity',e.target.value)}
                                style={{ width:'100%',padding:'6px 6px',border:`1px solid ${row.activity?COLORS.border:'#FCA5A5'}`,borderRadius:4,fontSize:11,outline:'none',background:'white',color:row.activity?COLORS.text:COLORS.textMuted }}>
                                <option value="">Select activity...</option>
                                {allActivities.map(a=><option key={a} value={a}>{a}</option>)}
                              </select>
                            </td>
                            <td style={{ padding:'4px 4px' }}>
                              <input type="number" min="0" max="24" step="0.5" value={row.hours} onChange={e=>updateBatchRow(idx,'hours',e.target.value)} placeholder="0"
                                style={{ width:'100%',padding:'6px 6px',border:`1px solid ${row.hours?COLORS.border:'#FCA5A5'}`,borderRadius:4,fontSize:12,outline:'none',textAlign:'center',fontWeight:600,background:'white',boxSizing:'border-box' }}/>
                            </td>
                            <td style={{ padding:'4px 4px' }}>
                              <input type="number" min="0" step="0.5" value={row.outputQty} onChange={e=>updateBatchRow(idx,'outputQty',e.target.value)} placeholder="—"
                                style={{ width:'100%',padding:'6px 6px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:12,outline:'none',textAlign:'center',background:'white',boxSizing:'border-box' }}/>
                            </td>
                            <td style={{ padding:'4px 8px',fontSize:10,color:COLORS.textMuted,fontWeight:500 }}>
                              {row.outputUnit || '—'}
                            </td>
                            <td style={{ padding:'4px 4px' }}>
                              <input type="text" value={row.remarks} onChange={e=>updateBatchRow(idx,'remarks',e.target.value)} placeholder="Optional"
                                style={{ width:'100%',padding:'6px 6px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:11,outline:'none',background:'white',color:COLORS.text,boxSizing:'border-box' }}/>
                            </td>
                            <td style={{ padding:'4px 4px',textAlign:'center' }}>
                              <div style={{ display:'flex',gap:2,justifyContent:'center' }}>
                                {idx > 0 && (
                                  <button onClick={()=>copyPrevRow(idx)} title="Copy area + activity from row above"
                                    style={{ background:'none',border:`1px solid ${COLORS.border}`,borderRadius:3,padding:'3px 4px',cursor:'pointer',display:'flex',alignItems:'center' }}>
                                    <Copy size={10} style={{ color:COLORS.textMuted }}/>
                                  </button>
                                )}
                                <button onClick={()=>removeBatchRow(idx)} title="Remove row"
                                  style={{ background:'none',border:`1px solid ${COLORS.border}`,borderRadius:3,padding:'3px 4px',cursor:'pointer',display:'flex',alignItems:'center' }}>
                                  <X size={10} style={{ color:COLORS.textMuted }}/>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Add row + Actions */}
                <div style={{ padding:'12px 20px',borderTop:`1px solid ${COLORS.border}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10 }}>
                  <div style={{ display:'flex',gap:8 }}>
                    <button onClick={addBatchRow}
                      style={{ background:'white',border:`1px dashed ${COLORS.border}`,borderRadius:6,padding:'7px 14px',fontSize:12,cursor:'pointer',fontWeight:500,display:'flex',alignItems:'center',gap:5,color:COLORS.textSecondary }}>
                      <Plus size={13}/>Add Row
                    </button>
                    <button onClick={()=>{ for(let i=0;i<5;i++) addBatchRow(); }}
                      style={{ background:'white',border:`1px dashed ${COLORS.border}`,borderRadius:6,padding:'7px 14px',fontSize:12,cursor:'pointer',fontWeight:500,color:COLORS.textSecondary }}>
                      +5 Rows
                    </button>
                  </div>
                  <div style={{ display:'flex',gap:8,alignItems:'center' }}>
                    <div style={{ fontSize:11,color:COLORS.textMuted,marginRight:4 }}>
                      {batchFilledRows.length} of {batchRows.length} rows filled
                    </div>
                    <button onClick={()=>showToast('Draft saved')}
                      style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'8px 16px',fontSize:12,cursor:'pointer',fontWeight:500 }}>
                      Save Draft
                    </button>
                    <button onClick={()=>{ if(batchFilledRows.length>0){ setBatchSaved(true); showToast(`${batchFilledRows.length} timesheet entries submitted`); }else{ showToast('Please fill at least one row'); } }}
                      style={{ background:batchFilledRows.length>0?COLORS.accent:'#CBD5E1',color:'white',border:'none',borderRadius:6,padding:'8px 20px',fontSize:13,cursor:batchFilledRows.length>0?'pointer':'not-allowed',fontWeight:600,display:'flex',alignItems:'center',gap:5 }}>
                      <Send size={13}/>Submit for Review
                    </button>
                  </div>
                </div>

                {/* Help text */}
                <div style={{ padding:'10px 20px',background:'#FAFAF8',borderTop:`1px solid ${COLORS.borderLight}`,fontSize:11,color:COLORS.textMuted,lineHeight:1.5 }}>
                  <b>Tips:</b> Required fields marked with *. Output quantity is optional but recommended for productivity tracking and payroll verification. Use the copy button to duplicate area and activity from the row above for faster entry. Submitted entries go to PM for review before payroll export.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  // ============================================================
  // ============================================================
  // PAGE: Materials
  // ============================================================
  const MaterialsPage = () => {
    const [matView, setMatView] = useState('list'); // list | new | detail
    const [selectedMatReq, setSelectedMatReq] = useState(null);

    // New request form state
    const [mrProject, setMrProject] = useState('p2');
    const [mrNodeId, setMrNodeId] = useState('');
    const [mrPriority, setMrPriority] = useState('Normal');
    const [mrNeededBy, setMrNeededBy] = useState('2025-03-20');
    const [mrNotes, setMrNotes] = useState('');
    const [mrSaved, setMrSaved] = useState(false);
    const [mrItems, setMrItems] = useState([
      { materialId:'m1', qty:24, note:'' },
      { materialId:'m3', qty:35, note:'' },
      { materialId:'m4', qty:30, note:'' },
      { materialId:'', qty:'', note:'' },
    ]);
    const mrNodes = projectNodes[mrProject] || [];
    const addMrItem = () => setMrItems([...mrItems, { materialId:'', qty:'', note:'' }]);
    const removeMrItem = (idx) => { if(mrItems.length>1) setMrItems(mrItems.filter((_,i)=>i!==idx)); };
    const updateMrItem = (idx, field, val) => { const next=[...mrItems]; next[idx]={...next[idx],[field]:val}; setMrItems(next); };
    const mrFilledItems = mrItems.filter(i=>i.materialId && i.qty);
    const getStock = (matId) => { const s = warehouseStock.find(w=>w.materialId===matId); return s ? s.available : 0; };

    // Fulfillment state for detail view
    const [fulfillMode, setFulfillMode] = useState(false);
    const [fulfillData, setFulfillData] = useState({});

    const detailMR = materialRequests.find(r=>r.id===selectedMatReq);

    const initFulfillment = (mr) => {
      const data = {};
      (mr.items||[]).forEach((item, i) => {
        const avail = getStock(materials.find(m=>m.name===item.material)?.id || '');
        data[i] = { fulfillQty: Math.min(item.requestedQty - item.fulfilledQty, avail), source: 'Central Warehouse', sourceNote: '' };
      });
      setFulfillData(data);
      setFulfillMode(true);
    };
    const updateFulfill = (idx, field, val) => setFulfillData({...fulfillData, [idx]: {...(fulfillData[idx]||{}), [field]: val}});

    return (
      <div>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16 }}>
          <div>
            <h1 style={{ fontSize:22,fontWeight:700,color:COLORS.text,margin:0 }}>Material Requests</h1>
            <p style={{ fontSize:13,color:COLORS.textSecondary,margin:'4px 0 0' }}>{materialRequests.length} requests</p>
          </div>
          <button onClick={()=>{setMatView('new');setMrSaved(false);}} style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 16px',fontSize:13,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:6 }}>
            <Plus size={14}/>New Request
          </button>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16 }}>
          <KpiCard label="Open Requests" value={materialRequests.filter(r=>!['Fulfilled','Draft'].includes(r.status)).length} icon={Package}/>
          <KpiCard label="Urgent" value={materialRequests.filter(r=>r.priority==='Urgent').length} icon={AlertTriangle} color={COLORS.red}/>
          <KpiCard label="Awaiting Approval" value={materialRequests.filter(r=>r.status==='Pending Approval').length} icon={Clock} color={COLORS.orange}/>
          <KpiCard label="Partially Fulfilled" value={materialRequests.filter(r=>r.status==='Partially Fulfilled').length} icon={Layers} color={COLORS.accent}/>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex',gap:0,borderBottom:`1px solid ${COLORS.border}`,marginBottom:16 }}>
          {[{id:'list',label:'All Requests'},{id:'new',label:'New Request'},{id:'detail',label:selectedMatReq?`${selectedMatReq} Detail`:'Request Detail'}].map(t=>(
            <button key={t.id} onClick={()=>{if(t.id!=='detail'||selectedMatReq) setMatView(t.id);}}
              style={{ padding:'10px 18px',fontSize:12,fontWeight:matView===t.id?600:400,color:matView===t.id?COLORS.accent:t.id==='detail'&&!selectedMatReq?COLORS.textMuted:COLORS.textSecondary,border:'none',background:'none',cursor:t.id==='detail'&&!selectedMatReq?'default':'pointer',borderBottom:matView===t.id?`2px solid ${COLORS.accent}`:'2px solid transparent' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ===== LIST VIEW ===== */}
        {matView === 'list' && (
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
            <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12 }}>
              <thead>
                <tr style={{ background:'#FAFAF8' }}>
                  {['Request ID','Project','Node','Requested By','Needed By','Priority','Status','Items','Source','Created'].map(h=>(
                    <th key={h} style={{ textAlign:'left',padding:'10px 12px',fontWeight:600,color:COLORS.textSecondary,fontSize:11,borderBottom:`1px solid ${COLORS.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {materialRequests.map(mr=>(
                  <tr key={mr.id} onClick={()=>{setSelectedMatReq(mr.id);setMatView('detail');setFulfillMode(false);}}
                    style={{ borderBottom:`1px solid ${COLORS.borderLight}`,cursor:'pointer' }}
                    onMouseEnter={e=>e.currentTarget.style.background='#FAFAF8'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <td style={{ padding:'10px 12px',fontWeight:600,color:COLORS.accent }}>{mr.id}</td>
                    <td style={{ padding:'10px 12px' }}>{getProject(mr.projectId)?.code}</td>
                    <td style={{ padding:'10px 12px' }}>{getNode(mr.projectId,mr.nodeId)?.name||'—'}</td>
                    <td style={{ padding:'10px 12px',color:COLORS.textSecondary }}>{getUser(mr.requestedBy).name.split(' ')[0]}</td>
                    <td style={{ padding:'10px 12px' }}>{mr.neededBy}</td>
                    <td style={{ padding:'10px 12px' }}><StatusBadge status={mr.priority} size="xs"/></td>
                    <td style={{ padding:'10px 12px' }}><StatusBadge status={mr.status} size="xs"/></td>
                    <td style={{ padding:'10px 12px',textAlign:'center' }}>{mr.itemCount}</td>
                    <td style={{ padding:'10px 12px',color:COLORS.textSecondary,fontSize:11 }}>{mr.source}</td>
                    <td style={{ padding:'10px 12px',color:COLORS.textMuted }}>{mr.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ===== NEW REQUEST FORM ===== */}
        {matView === 'new' && (
          <div>
            {mrSaved ? (
              <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:40,textAlign:'center' }}>
                <div style={{ width:48,height:48,borderRadius:24,background:COLORS.greenLight,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px' }}><Check size={24} style={{ color:COLORS.green }}/></div>
                <div style={{ fontSize:18,fontWeight:700,marginBottom:6 }}>Material Request Submitted</div>
                <div style={{ fontSize:13,color:COLORS.textSecondary,marginBottom:4 }}>{mrFilledItems.length} items · {getProject(mrProject)?.code} · {mrNodes.find(n=>n.id===mrNodeId)?.name||'—'}</div>
                <div style={{ fontSize:12,color:COLORS.textMuted,marginBottom:20 }}>Request sent for PM approval. You will be notified once approved and ready for fulfillment.</div>
                <div style={{ display:'flex',gap:10,justifyContent:'center' }}>
                  <button onClick={()=>{setMrSaved(false);setMrItems([{materialId:'',qty:'',note:''}]);setMrNodeId('');setMrNotes('');}} style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 20px',fontSize:13,cursor:'pointer',fontWeight:600 }}>Create Another</button>
                  <button onClick={()=>setMatView('list')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'8px 20px',fontSize:13,cursor:'pointer',fontWeight:500 }}>View All Requests</button>
                </div>
              </div>
            ) : (
              <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
                <div style={{ padding:'16px 20px',borderBottom:`1px solid ${COLORS.border}`,background:'#FAFAF8' }}>
                  <h3 style={{ fontSize:16,fontWeight:700,margin:0 }}>New Material Request</h3>
                  <div style={{ fontSize:12,color:COLORS.textSecondary,marginTop:4 }}>Request materials for a specific project area. Each item will be checked against warehouse stock.</div>
                  <div style={{ display:'flex',gap:12,marginTop:14,flexWrap:'wrap' }}>
                    <div style={{ display:'flex',flexDirection:'column',gap:3 }}>
                      <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,textTransform:'uppercase',letterSpacing:'0.04em' }}>Project *</label>
                      <select value={mrProject} onChange={e=>{setMrProject(e.target.value);setMrNodeId('');}}
                        style={{ padding:'7px 10px',border:`1px solid ${COLORS.border}`,borderRadius:5,fontSize:12,outline:'none',background:'white',minWidth:220 }}>
                        {projects.map(p=><option key={p.id} value={p.id}>{p.code} — {p.name.split('–')[0].trim()}</option>)}
                      </select>
                    </div>
                    <div style={{ display:'flex',flexDirection:'column',gap:3 }}>
                      <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,textTransform:'uppercase',letterSpacing:'0.04em' }}>Area / Node *</label>
                      <select value={mrNodeId} onChange={e=>setMrNodeId(e.target.value)}
                        style={{ padding:'7px 10px',border:`1px solid ${mrNodeId?COLORS.border:'#FCA5A5'}`,borderRadius:5,fontSize:12,outline:'none',background:'white',minWidth:180 }}>
                        <option value="">Select area...</option>
                        {mrNodes.map(n=><option key={n.id} value={n.id}>{'\u00A0'.repeat(n.level*2)}{n.name}</option>)}
                      </select>
                    </div>
                    <div style={{ display:'flex',flexDirection:'column',gap:3 }}>
                      <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,textTransform:'uppercase',letterSpacing:'0.04em' }}>Priority</label>
                      <select value={mrPriority} onChange={e=>setMrPriority(e.target.value)}
                        style={{ padding:'7px 10px',border:`1px solid ${COLORS.border}`,borderRadius:5,fontSize:12,outline:'none',background:'white',width:120 }}>
                        <option>Normal</option><option>Urgent</option>
                      </select>
                    </div>
                    <div style={{ display:'flex',flexDirection:'column',gap:3 }}>
                      <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,textTransform:'uppercase',letterSpacing:'0.04em' }}>Needed By *</label>
                      <input type="date" value={mrNeededBy} onChange={e=>setMrNeededBy(e.target.value)}
                        style={{ padding:'7px 10px',border:`1px solid ${COLORS.border}`,borderRadius:5,fontSize:12,outline:'none',background:'white',width:150 }}/>
                    </div>
                  </div>
                </div>

                {/* Items grid */}
                <div style={{ overflowX:'auto' }}>
                  <table style={{ width:'100%',borderCollapse:'collapse',fontSize:12,minWidth:750 }}>
                    <thead>
                      <tr style={{ background:'#F5F4F1' }}>
                        <th style={{ padding:'8px 6px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,width:28,textAlign:'center' }}>#</th>
                        <th style={{ padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,minWidth:220 }}>Material *</th>
                        <th style={{ padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,width:70,textAlign:'center' }}>Qty *</th>
                        <th style={{ padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,width:50 }}>Unit</th>
                        <th style={{ padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,width:70,textAlign:'center' }}>In Stock</th>
                        <th style={{ padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,width:80 }}>Availability</th>
                        <th style={{ padding:'8px 8px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,minWidth:120 }}>Note</th>
                        <th style={{ padding:'8px 6px',fontWeight:600,color:COLORS.textSecondary,fontSize:10,borderBottom:`2px solid ${COLORS.border}`,width:36 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {mrItems.map((row, idx) => {
                        const mat = materials.find(m=>m.id===row.materialId);
                        const stock = row.materialId ? getStock(row.materialId) : null;
                        const shortage = row.materialId && row.qty && stock !== null && parseFloat(row.qty) > stock;
                        return (
                          <tr key={idx} style={{ borderBottom:`1px solid ${COLORS.borderLight}`,background:shortage?COLORS.redLight+'40':'transparent' }}>
                            <td style={{ padding:'6px 6px',textAlign:'center',color:COLORS.textMuted,fontSize:10 }}>{idx+1}</td>
                            <td style={{ padding:'4px 4px' }}>
                              <select value={row.materialId} onChange={e=>updateMrItem(idx,'materialId',e.target.value)}
                                style={{ width:'100%',padding:'6px 6px',border:`1px solid ${row.materialId?COLORS.border:'#FCA5A5'}`,borderRadius:4,fontSize:11,outline:'none',background:'white' }}>
                                <option value="">Select material...</option>
                                {Object.entries(materials.reduce((g,m)=>{(g[m.category]=g[m.category]||[]).push(m);return g;},{})).map(([cat,mats])=>(
                                  <optgroup key={cat} label={cat}>
                                    {mats.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
                                  </optgroup>
                                ))}
                              </select>
                            </td>
                            <td style={{ padding:'4px 4px' }}>
                              <input type="number" min="0" step="1" value={row.qty} onChange={e=>updateMrItem(idx,'qty',e.target.value)} placeholder="0"
                                style={{ width:'100%',padding:'6px 6px',border:`1px solid ${row.qty?COLORS.border:'#FCA5A5'}`,borderRadius:4,fontSize:12,outline:'none',textAlign:'center',fontWeight:600,background:'white',boxSizing:'border-box' }}/>
                            </td>
                            <td style={{ padding:'4px 8px',fontSize:10,color:COLORS.textMuted }}>{mat?.unit||'—'}</td>
                            <td style={{ padding:'4px 8px',textAlign:'center',fontWeight:600,color:stock!==null?(shortage?COLORS.red:COLORS.green):COLORS.textMuted }}>
                              {stock !== null ? stock : '—'}
                            </td>
                            <td style={{ padding:'4px 8px' }}>
                              {row.materialId && row.qty ? (
                                shortage ? <span style={{ fontSize:9,fontWeight:600,padding:'2px 6px',borderRadius:3,background:COLORS.redLight,color:COLORS.red }}>Purchase Needed</span>
                                : <span style={{ fontSize:9,fontWeight:600,padding:'2px 6px',borderRadius:3,background:COLORS.greenLight,color:COLORS.green }}>In Stock</span>
                              ) : <span style={{ color:COLORS.textMuted,fontSize:10 }}>—</span>}
                            </td>
                            <td style={{ padding:'4px 4px' }}>
                              <input value={row.note} onChange={e=>updateMrItem(idx,'note',e.target.value)} placeholder="Optional"
                                style={{ width:'100%',padding:'6px 6px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:11,outline:'none',background:'white',boxSizing:'border-box' }}/>
                            </td>
                            <td style={{ padding:'4px 4px',textAlign:'center' }}>
                              <button onClick={()=>removeMrItem(idx)} style={{ background:'none',border:`1px solid ${COLORS.border}`,borderRadius:3,padding:'3px 4px',cursor:'pointer' }}><X size={10} style={{ color:COLORS.textMuted }}/></button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {mrNotes!==null && (
                  <div style={{ padding:'0 20px',marginTop:12 }}>
                    <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,textTransform:'uppercase',letterSpacing:'0.04em',display:'block',marginBottom:4 }}>General Notes</label>
                    <textarea value={mrNotes} onChange={e=>setMrNotes(e.target.value)} rows={2} placeholder="Any general notes for the warehouse or approver..."
                      style={{ width:'100%',padding:'8px 10px',border:`1px solid ${COLORS.border}`,borderRadius:5,fontSize:12,outline:'none',resize:'vertical',fontFamily:'inherit',background:'white',boxSizing:'border-box' }}/>
                  </div>
                )}

                <div style={{ padding:'12px 20px',borderTop:`1px solid ${COLORS.border}`,marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10 }}>
                  <div style={{ display:'flex',gap:8 }}>
                    <button onClick={addMrItem} style={{ background:'white',border:`1px dashed ${COLORS.border}`,borderRadius:6,padding:'7px 14px',fontSize:12,cursor:'pointer',fontWeight:500,display:'flex',alignItems:'center',gap:5,color:COLORS.textSecondary }}><Plus size={13}/>Add Item</button>
                  </div>
                  <div style={{ display:'flex',gap:8,alignItems:'center' }}>
                    <span style={{ fontSize:11,color:COLORS.textMuted }}>{mrFilledItems.length} item(s)</span>
                    <button onClick={()=>showToast('Draft saved')} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'8px 16px',fontSize:12,cursor:'pointer',fontWeight:500 }}>Save Draft</button>
                    <button onClick={()=>{if(mrNodeId&&mrFilledItems.length>0){setMrSaved(true);showToast('Material request submitted');}else{showToast('Select area and add at least one item');}}}
                      style={{ background:mrNodeId&&mrFilledItems.length>0?COLORS.accent:'#CBD5E1',color:'white',border:'none',borderRadius:6,padding:'8px 20px',fontSize:13,cursor:mrNodeId&&mrFilledItems.length>0?'pointer':'not-allowed',fontWeight:600,display:'flex',alignItems:'center',gap:5 }}>
                      <Send size={13}/>Submit Request
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== DETAIL + FULFILLMENT VIEW ===== */}
        {matView === 'detail' && detailMR && (
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
            {/* Left: Request Details */}
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
              <div style={{ padding:'16px 20px',borderBottom:`1px solid ${COLORS.border}`,background:'#FAFAF8' }}>
                <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                  <div>
                    <h3 style={{ fontSize:16,fontWeight:700,margin:0 }}>{detailMR.id}</h3>
                    <div style={{ fontSize:12,color:COLORS.textSecondary,marginTop:4 }}>{getProject(detailMR.projectId)?.code} · {getNode(detailMR.projectId,detailMR.nodeId)?.name||'General'}</div>
                  </div>
                  <StatusBadge status={detailMR.status}/>
                </div>
              </div>
              <div style={{ padding:16 }}>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:16 }}>
                  {[['Priority',detailMR.priority],['Needed By',detailMR.neededBy],['Requested By',getUser(detailMR.requestedBy).name],['Source',detailMR.source],['Created',detailMR.created],['Items',detailMR.itemCount]].map(([k,v])=>(
                    <div key={k} style={{ padding:'6px 10px',background:'#FAFAF8',borderRadius:4 }}>
                      <div style={{ fontSize:10,color:COLORS.textMuted }}>{k}</div>
                      <div style={{ fontSize:12,fontWeight:500 }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize:12,fontWeight:600,marginBottom:8 }}>Line Items</div>
                {(detailMR.items||[]).map((item, i) => {
                  const shortage = item.requestedQty > item.availableQty;
                  const fulfillPct = item.requestedQty>0 ? Math.round(item.fulfilledQty/item.requestedQty*100) : 0;
                  return (
                    <div key={i} style={{ padding:'10px 12px',borderRadius:6,border:`1px solid ${COLORS.border}`,marginBottom:6,background:shortage?COLORS.orangeLight+'60':'white' }}>
                      <div style={{ fontSize:12,fontWeight:600,marginBottom:6 }}>{item.material}</div>
                      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6,fontSize:10,marginBottom:4 }}>
                        <div><span style={{ color:COLORS.textMuted }}>Requested</span><div style={{ fontWeight:700,fontSize:13 }}>{item.requestedQty} <span style={{ fontWeight:400,fontSize:10 }}>{item.unit}</span></div></div>
                        <div><span style={{ color:COLORS.textMuted }}>Available</span><div style={{ fontWeight:700,fontSize:13,color:shortage?COLORS.red:COLORS.green }}>{item.availableQty}</div></div>
                        <div><span style={{ color:COLORS.textMuted }}>Approved</span><div style={{ fontWeight:700,fontSize:13 }}>{item.approvedQty||'—'}</div></div>
                        <div><span style={{ color:COLORS.textMuted }}>Fulfilled</span><div style={{ fontWeight:700,fontSize:13,color:item.fulfilledQty>=item.requestedQty?COLORS.green:item.fulfilledQty>0?COLORS.orange:COLORS.textMuted }}>{item.fulfilledQty}</div></div>
                      </div>
                      <ProgressBar value={fulfillPct} height={4} color={fulfillPct>=100?COLORS.green:fulfillPct>0?COLORS.orange:'#E5E7EB'}/>
                      {item.note && <div style={{ fontSize:10,color:COLORS.orange,marginTop:4,fontStyle:'italic' }}>{item.note}</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Fulfillment Panel */}
            <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,overflow:'hidden' }}>
              <div style={{ padding:'16px 20px',borderBottom:`1px solid ${COLORS.border}`,background:'#FAFAF8',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                <div>
                  <h3 style={{ fontSize:14,fontWeight:700,margin:0 }}>{fulfillMode?'Fulfill Request':'Actions & Fulfillment'}</h3>
                  <div style={{ fontSize:11,color:COLORS.textSecondary,marginTop:2 }}>{fulfillMode?'Specify quantities and sources for each item':'Choose an action for this request'}</div>
                </div>
                {fulfillMode && <button onClick={()=>setFulfillMode(false)} style={{ background:'none',border:`1px solid ${COLORS.border}`,borderRadius:4,padding:'4px 10px',fontSize:11,cursor:'pointer' }}>Cancel</button>}
              </div>
              <div style={{ padding:16 }}>
                {!fulfillMode ? (
                  <div>
                    {/* Action buttons based on status */}
                    <div style={{ display:'flex',flexDirection:'column',gap:8,marginBottom:20 }}>
                      {['Submitted','Pending Approval'].includes(detailMR.status) && (
                        <>
                          <button onClick={()=>showToast(`${detailMR.id} approved`)} style={{ width:'100%',background:COLORS.green,color:'white',border:'none',borderRadius:6,padding:'10px',fontSize:13,cursor:'pointer',fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',gap:6 }}>
                            <Check size={14}/>Approve Request
                          </button>
                          <button onClick={()=>showToast(`${detailMR.id} rejected`)} style={{ width:'100%',background:'white',border:`1px solid ${COLORS.red}`,borderRadius:6,padding:'10px',fontSize:13,cursor:'pointer',fontWeight:500,color:COLORS.red }}>
                            Reject Request
                          </button>
                        </>
                      )}
                      {['Approved','Partially Fulfilled'].includes(detailMR.status) && (
                        <button onClick={()=>initFulfillment(detailMR)} style={{ width:'100%',background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'10px',fontSize:13,cursor:'pointer',fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',gap:6 }}>
                          <Truck size={14}/>{detailMR.status==='Partially Fulfilled'?'Continue Fulfillment':'Start Fulfillment'}
                        </button>
                      )}
                      {detailMR.status==='Fulfilled' && (
                        <div style={{ padding:20,textAlign:'center' }}>
                          <div style={{ width:40,height:40,borderRadius:20,background:COLORS.greenLight,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px' }}><Check size={20} style={{ color:COLORS.green }}/></div>
                          <div style={{ fontSize:14,fontWeight:600,color:COLORS.green }}>Fully Fulfilled</div>
                          <div style={{ fontSize:11,color:COLORS.textMuted,marginTop:4 }}>All items have been issued from stock</div>
                        </div>
                      )}
                    </div>

                    {/* Availability summary */}
                    <div style={{ fontSize:12,fontWeight:600,marginBottom:8 }}>Stock Availability</div>
                    {(detailMR.items||[]).map((item, i) => {
                      const shortage = item.requestedQty > item.availableQty;
                      const remaining = item.requestedQty - item.fulfilledQty;
                      return (
                        <div key={i} style={{ padding:'8px 10px',borderRadius:6,border:`1px solid ${COLORS.borderLight}`,marginBottom:4,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                          <div>
                            <div style={{ fontSize:11,fontWeight:500 }}>{item.material}</div>
                            <div style={{ fontSize:10,color:COLORS.textMuted }}>Need: {remaining} {item.unit} · Warehouse: {item.availableQty}</div>
                          </div>
                          {shortage ?
                            <span style={{ fontSize:9,fontWeight:600,padding:'2px 6px',borderRadius:3,background:COLORS.redLight,color:COLORS.red }}>Purchase</span> :
                            <span style={{ fontSize:9,fontWeight:600,padding:'2px 6px',borderRadius:3,background:COLORS.greenLight,color:COLORS.green }}>Available</span>
                          }
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Fulfillment form */
                  <div>
                    {(detailMR.items||[]).map((item, i) => {
                      const remaining = item.requestedQty - item.fulfilledQty;
                      if (remaining <= 0) return null;
                      const fd = fulfillData[i] || { fulfillQty:0, source:'Central Warehouse', sourceNote:'' };
                      return (
                        <div key={i} style={{ padding:12,borderRadius:8,border:`1px solid ${COLORS.border}`,marginBottom:10,background:'#FAFAF8' }}>
                          <div style={{ fontSize:12,fontWeight:600,marginBottom:8 }}>{item.material}</div>
                          <div style={{ fontSize:10,color:COLORS.textMuted,marginBottom:8 }}>Remaining to fulfill: <b>{remaining} {item.unit}</b> · Warehouse stock: <b>{item.availableQty}</b></div>
                          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8 }}>
                            <div>
                              <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,display:'block',marginBottom:3 }}>Issue Qty</label>
                              <input type="number" min="0" max={remaining} value={fd.fulfillQty} onChange={e=>updateFulfill(i,'fulfillQty',e.target.value)}
                                style={{ width:'100%',padding:'7px 8px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:12,fontWeight:600,outline:'none',background:'white',boxSizing:'border-box' }}/>
                            </div>
                            <div>
                              <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,display:'block',marginBottom:3 }}>Source</label>
                              <select value={fd.source} onChange={e=>updateFulfill(i,'source',e.target.value)}
                                style={{ width:'100%',padding:'7px 8px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:11,outline:'none',background:'white',boxSizing:'border-box' }}>
                                <option>Central Warehouse</option>
                                <option>BuildMart LLC (Partner)</option>
                                <option>ProfiShin LLC (Partner)</option>
                                <option>MegaCeram Armenia (Partner)</option>
                                <option>ElectroHouse (Partner)</option>
                                <option>NorNerk Paints (Partner)</option>
                                <option>GlassLine Studio (Partner)</option>
                                <option>Inter-Project Transfer</option>
                                <option>Direct Purchase</option>
                              </select>
                            </div>
                          </div>
                          {fd.source !== 'Central Warehouse' && (
                            <div>
                              <label style={{ fontSize:10,fontWeight:600,color:COLORS.textSecondary,display:'block',marginBottom:3 }}>Source Details</label>
                              <input value={fd.sourceNote} onChange={e=>updateFulfill(i,'sourceNote',e.target.value)}
                                placeholder={fd.source.includes('Partner')?'PO number or delivery date...':fd.source==='Inter-Project Transfer'?'Source project and node...':'Purchase order reference...'}
                                style={{ width:'100%',padding:'6px 8px',border:`1px solid ${COLORS.border}`,borderRadius:4,fontSize:11,outline:'none',background:'white',boxSizing:'border-box' }}/>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <div style={{ display:'flex',gap:8,marginTop:12 }}>
                      <button onClick={()=>{showToast(`${detailMR.id} fulfillment recorded`);setFulfillMode(false);}}
                        style={{ flex:1,background:COLORS.green,color:'white',border:'none',borderRadius:6,padding:'10px',fontSize:13,cursor:'pointer',fontWeight:600 }}>
                        Confirm Fulfillment
                      </button>
                      <button onClick={()=>setFulfillMode(false)} style={{ background:'white',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'10px 16px',fontSize:13,cursor:'pointer',fontWeight:500 }}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {matView === 'detail' && !detailMR && (
          <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:40,textAlign:'center',color:COLORS.textMuted }}>
            <Package size={32} style={{ marginBottom:8 }}/>
            <div style={{ fontSize:13 }}>Select a request from the list to view details</div>
            <button onClick={()=>setMatView('list')} style={{ marginTop:12,background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'8px 16px',fontSize:12,cursor:'pointer',fontWeight:500 }}>Go to List</button>
          </div>
        )}
      </div>
    );
  };

  // ============================================================
  // PAGE: Catalogs
  // ============================================================
  const CatalogsPage = () => {
    const tiles = [
      { title: 'Material Catalog', sub: `${materials.length} items`, icon: Package, color: COLORS.accent },
      { title: 'Template Library', sub: '6 assembly templates', icon: Layers, color: COLORS.green },
      { title: 'Labor Activities', sub: '10 activity types', icon: Hammer, color: COLORS.orange },
      { title: 'Units & Conversions', sub: '15 unit types', icon: RefreshCw, color: COLORS.purple },
      { title: 'Project Type Templates', sub: '4 project templates', icon: LayoutGrid, color: COLORS.yellow },
      { title: 'Approval Rules', sub: '6 routing rules', icon: CheckSquare, color: COLORS.red },
      { title: 'Users & Roles', sub: `${users.length} users`, icon: Users, color: COLORS.textSecondary },
    ];

    return (
      <div>
        <h1 style={{ fontSize:22,fontWeight:700,color:COLORS.text,margin:'0 0 20px' }}>Catalogs</h1>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:16 }}>
          {tiles.map(tile=>(
            <div key={tile.title} onClick={()=>showToast(`Opening ${tile.title}...`)}
              style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:24,cursor:'pointer',transition:'box-shadow 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
              <tile.icon size={28} style={{ color:tile.color,marginBottom:12 }}/>
              <div style={{ fontSize:15,fontWeight:600,marginBottom:4 }}>{tile.title}</div>
              <div style={{ fontSize:12,color:COLORS.textSecondary }}>{tile.sub}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ============================================================
  // PAGE: Admin
  // ============================================================
  const AdminPage = () => (
    <div>
      <h1 style={{ fontSize:22,fontWeight:700,color:COLORS.text,margin:'0 0 20px' }}>Admin & Settings</h1>
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
        <div style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:20 }}>
          <h3 style={{ fontSize:14,fontWeight:600,margin:'0 0 12px' }}>Users</h3>
          {users.map(u=>(
            <div key={u.id} style={{ display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:`1px solid ${COLORS.borderLight}` }}>
              <div style={{ width:32,height:32,borderRadius:16,background:COLORS.accent,color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:600 }}>{u.initials}</div>
              <div>
                <div style={{ fontSize:13,fontWeight:500 }}>{u.name}</div>
                <div style={{ fontSize:11,color:COLORS.textSecondary }}>{u.role}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {[{t:'Status Dictionaries',s:'Project stages, request statuses, approval states'},{t:'Approval Routing',s:'Rules for estimate, purchase, and change order approvals'},{t:'Notification Settings',s:'Email, in-app, and push notification rules'},{t:'Units & Conversions',s:'Measurement units and conversion factors'},{t:'Numbering Rules',s:'Auto-numbering for projects, requests, deliveries'}].map(item=>(
            <div key={item.t} style={{ background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:16,marginBottom:12,cursor:'pointer' }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.06)'}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
              <div style={{ fontSize:14,fontWeight:600,marginBottom:4 }}>{item.t}</div>
              <div style={{ fontSize:12,color:COLORS.textSecondary }}>{item.s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================================
  // RENDER PAGE
  // ============================================================
  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard': return <DashboardPage/>;
      case 'projects': return <ProjectsListPage/>;
      case 'project-workspace': return <ProjectWorkspacePage/>;
      case 'estimates': return <EstimatesPage/>;
      case 'materials': return <MaterialsPage/>;
      case 'warehouse': return <WarehousePage/>;
      case 'transfers':       return <TransferListPage/>;
      case 'new-transfer':    return <NewTransferPage/>;
      case 'transfer-detail': return <TransferDetailPage/>;
      case 'field-reports': return <FieldReportsPage/>;
      case 'timesheets': return <TimesheetsPage/>;
      case 'approvals': return <ApprovalsPage/>;
      case 'catalogs': return <CatalogsPage/>;
      case 'admin': return <AdminPage/>;
      default: return <DashboardPage/>;
    }
  };

  // ============================================================
  // MAIN LAYOUT
  // ============================================================
  return (
    <div style={{ display:'flex',height:'100vh',fontFamily:'"IBM Plex Sans", -apple-system, BlinkMacSystemFont, sans-serif',background:COLORS.bg,overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #C4C4C4; border-radius: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        table th, table td { text-align: left; }
        input:focus, select:focus { border-color: ${COLORS.accent} !important; }
      `}</style>

      {/* Sidebar */}
      <div style={{ width: sidebarCollapsed?60:220,background:COLORS.sidebar,display:'flex',flexDirection:'column',transition:'width 0.2s',flexShrink:0,zIndex:100 }}>
        <div style={{ padding: sidebarCollapsed?'16px 10px':'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',gap:10 }}>
          {sidebarCollapsed && <div style={{ width:32,height:32,background:COLORS.accent,borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:14,flexShrink:0 }}>B</div>}
          {!sidebarCollapsed && <span style={{ color:'white',fontSize:16,fontWeight:700,letterSpacing:'-0.02em' }}><img src={berglogo} style={{ maxWidth:150 }} alt="Berg" /></span>}
        </div>

        <div style={{ flex:1,padding:'8px 0',overflowY:'auto' }}>
          {navItems.map(item=>{
            const isActive = currentPage===item.id || (item.id==='projects'&&currentPage==='project-workspace');
            return (
              <div key={item.id} onClick={()=>{setCurrentPage(item.id);setSelectedProject(null);}}
                style={{ display:'flex',alignItems:'center',gap:10,padding: sidebarCollapsed?'10px 18px':'10px 20px',cursor:'pointer',background: isActive?COLORS.sidebarActive:'transparent',color: isActive?'white':'rgba(255,255,255,0.6)',fontSize:13,fontWeight: isActive?600:400,transition:'all 0.15s',position:'relative' }}
                onMouseEnter={e=>{ if(!isActive) e.currentTarget.style.background=COLORS.sidebarHover; e.currentTarget.style.color='white'; }}
                onMouseLeave={e=>{ if(!isActive) e.currentTarget.style.background='transparent'; e.currentTarget.style.color=isActive?'white':'rgba(255,255,255,0.6)'; }}>
                <item.icon size={18} style={{ flexShrink:0 }}/>
                {!sidebarCollapsed && <span>{item.label}</span>}
                {item.id==='approvals'&&pendingApprovals>0&&!sidebarCollapsed&&(
                  <span style={{ marginLeft:'auto',background:COLORS.red,color:'white',fontSize:10,fontWeight:700,borderRadius:10,padding:'1px 6px',minWidth:18,textAlign:'center' }}>{pendingApprovals}</span>
                )}
              </div>
            );
          })}
        </div>

        <div onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}
          style={{ padding:'12px 20px',borderTop:'1px solid rgba(255,255,255,0.08)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.4)' }}>
          {sidebarCollapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
        </div>
      </div>

      {/* Main Area */}
      <div style={{ flex:1,display:'flex',flexDirection:'column',overflow:'hidden' }}>
        {/* Topbar */}
        <div style={{ height:52,background:COLORS.topbar,borderBottom:`1px solid ${COLORS.border}`,display:'flex',alignItems:'center',padding:'0 24px',gap:16,flexShrink:0 }}>
          <div style={{ position:'relative',flex:1,maxWidth:400 }}>
            <Search size={14} style={{ position:'absolute',left:10,top:9,color:COLORS.textMuted }}/>
            <input placeholder="Search projects, materials, requests..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
              style={{ width:'100%',padding:'7px 12px 7px 30px',border:`1px solid ${COLORS.border}`,borderRadius:6,fontSize:12,outline:'none',background:'#FAFAF8' }}/>
          </div>

          <div style={{ display:'flex',alignItems:'center',gap:8,marginLeft:'auto' }}>
            {/* Quick Create */}
            <div style={{ position:'relative' }}>
              <button onClick={()=>setShowQuickCreate(!showQuickCreate)}
                style={{ background:COLORS.accent,color:'white',border:'none',borderRadius:6,padding:'6px 12px',fontSize:12,cursor:'pointer',display:'flex',alignItems:'center',gap:4,fontWeight:600 }}>
                <Plus size={14}/>New
              </button>
              {showQuickCreate && (
                <div style={{ position:'absolute',top:'100%',right:0,marginTop:4,background:'white',border:`1px solid ${COLORS.border}`,borderRadius:8,boxShadow:'0 8px 30px rgba(0,0,0,0.12)',padding:4,zIndex:1000,minWidth:180 }}>
                  {['New Project','Material Request','Weekly Report','Timesheet Entry','Change Order','Transfer Order'].map(item=>(
                    <div key={item} onClick={()=>{
                      if(item==='Transfer Order'){setCurrentPage('new-transfer');setShowQuickCreate(false);return;}
                      showToast(`${item} form opened`);setShowQuickCreate(false);
                    }}
                      style={{ padding:'8px 12px',fontSize:12,cursor:'pointer',borderRadius:4 }}
                      onMouseEnter={e=>e.currentTarget.style.background='#F5F5F5'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div style={{ position:'relative' }}>
              <button onClick={()=>setShowNotifications(!showNotifications)}
                style={{ background:'none',border:'none',cursor:'pointer',position:'relative',padding:6 }}>
                <Bell size={18} style={{ color:COLORS.textSecondary }}/>
                <span style={{ position:'absolute',top:2,right:2,width:8,height:8,background:COLORS.red,borderRadius:4,border:'2px solid white' }}/>
              </button>
              {showNotifications && (
                <div style={{ position:'absolute',top:'100%',right:0,marginTop:4,background:'white',border:`1px solid ${COLORS.border}`,borderRadius:8,boxShadow:'0 8px 30px rgba(0,0,0,0.12)',padding:4,zIndex:1000,width:340 }}>
                  <div style={{ padding:'8px 12px',fontSize:13,fontWeight:600,borderBottom:`1px solid ${COLORS.border}` }}>Notifications</div>
                  {notifications.map(n=>(
                    <div key={n.id} style={{ padding:'10px 12px',borderBottom:`1px solid ${COLORS.borderLight}`,cursor:'pointer',background:n.read?'transparent':'#FFFBEB' }}
                      onMouseEnter={e=>e.currentTarget.style.background='#F5F5F5'}
                      onMouseLeave={e=>e.currentTarget.style.background=n.read?'transparent':'#FFFBEB'}>
                      <div style={{ fontSize:12 }}>{n.message}</div>
                      <div style={{ fontSize:10,color:COLORS.textMuted,marginTop:4 }}>{n.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pending Approvals */}
            <button onClick={()=>setCurrentPage('approvals')}
              style={{ background:'none',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'5px 10px',fontSize:11,cursor:'pointer',display:'flex',alignItems:'center',gap:4,fontWeight:500 }}>
              <CheckSquare size={13} style={{ color:COLORS.orange }}/>
              {pendingApprovals}
            </button>

            {/* Role Switcher */}
            <div style={{ position:'relative' }}>
              <button onClick={()=>setShowRoleSwitcher(!showRoleSwitcher)}
                style={{ background:'none',border:`1px solid ${COLORS.border}`,borderRadius:6,padding:'5px 12px',fontSize:12,cursor:'pointer',display:'flex',alignItems:'center',gap:6 }}>
                <div style={{ width:24,height:24,borderRadius:12,background:COLORS.accent,color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:600 }}>{currentUser.initials}</div>
                <div style={{ textAlign:'left' }}>
                  <div style={{ fontSize:12,fontWeight:500,lineHeight:1.2 }}>{currentUser.name.split(' ')[0]}</div>
                  <div style={{ fontSize:10,color:COLORS.textMuted }}>{currentRole}</div>
                </div>
                <ChevronDown size={12} style={{ color:COLORS.textMuted }}/>
              </button>
              {showRoleSwitcher && (
                <div style={{ position:'absolute',top:'100%',right:0,marginTop:4,background:'white',border:`1px solid ${COLORS.border}`,borderRadius:8,boxShadow:'0 8px 30px rgba(0,0,0,0.12)',padding:4,zIndex:1000,minWidth:200 }}>
                  <div style={{ padding:'6px 12px',fontSize:10,fontWeight:600,color:COLORS.textMuted,letterSpacing:'0.05em' }}>DEMO ROLE SWITCHER</div>
                  {['Director','Project Manager','Superintendent','Warehouse Manager','Cost Engineer'].map(role=>(
                    <div key={role} onClick={()=>{setCurrentRole(role);setShowRoleSwitcher(false);showToast(`Switched to ${role} view`);}}
                      style={{ padding:'8px 12px',fontSize:12,cursor:'pointer',borderRadius:4,fontWeight: currentRole===role?600:400,color: currentRole===role?COLORS.accent:COLORS.text }}
                      onMouseEnter={e=>e.currentTarget.style.background='#F5F5F5'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      {role}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex:1,overflow:'auto',padding:24 }}
          onClick={()=>{setShowNotifications(false);setShowRoleSwitcher(false);setShowQuickCreate(false);}}>
          {renderPage()}
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} onClose={()=>setToast({visible:false,message:''})}/>
    </div>
  );
}
