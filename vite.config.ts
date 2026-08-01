import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          services: path.resolve(__dirname, 'services.html'),
          serviceAreas: path.resolve(__dirname, 'service-areas.html'),
          projects: path.resolve(__dirname, 'projects.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          visitShowroom: path.resolve(__dirname, 'visit-showroom.html'),
          requestConsultation: path.resolve(__dirname, 'request-design-consultation.html'),
          luxuryInteriorDesign: path.resolve(__dirname, 'luxury-interior-design.html'),
          architecture: path.resolve(__dirname, 'architecture.html'),
          kitchenDesign: path.resolve(__dirname, 'kitchen-design.html'),
          bathroomDesign: path.resolve(__dirname, 'bathroom-design.html'),
          livingRoomDesign: path.resolve(__dirname, 'living-room-design.html'),
          bedroomDesign: path.resolve(__dirname, 'bedroom-design.html'),
          officeDesign: path.resolve(__dirname, 'office-design.html'),
          commercialDesign: path.resolve(__dirname, 'commercial-design.html'),
          renovation: path.resolve(__dirname, 'renovation.html'),
          spacePlanning: path.resolve(__dirname, 'space-planning.html'),
          lightingDesign: path.resolve(__dirname, 'lighting-design.html'),
          v3dVisualization: path.resolve(__dirname, '3d-visualization.html'),
          modernVilla: path.resolve(__dirname, 'modern-villa.html'),
          luxuryKitchen: path.resolve(__dirname, 'luxury-kitchen.html'),
          minimalOffice: path.resolve(__dirname, 'minimal-office.html'),
          urbanApartment: path.resolve(__dirname, 'urban-apartment.html'),
          newYork: path.resolve(__dirname, 'new-york.html'),
          brooklyn: path.resolve(__dirname, 'brooklyn.html'),
          queens: path.resolve(__dirname, 'queens.html'),
          manhattan: path.resolve(__dirname, 'manhattan.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
