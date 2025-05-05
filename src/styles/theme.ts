export const theme = {
  colors: {
    // Primary Colors
    primary: {
      light: '#818CF8', // Indigo-400
      main: '#6366F1',  // Indigo-500
      dark: '#4F46E5',  // Indigo-600
    },
    // Secondary Colors
    secondary: {
      light: '#F472B6', // Pink-400
      main: '#EC4899',  // Pink-500
      dark: '#DB2777',  // Pink-600
    },
    // Accent Colors
    accent: {
      purple: {
        light: '#9d4edd',
        main: '#7b2cbf',
        dark: '#5a189a'
      },
      blue: {
        light: '#4cc9f0',
        main: '#4361ee',
        dark: '#3a0ca3'
      },
      yellow: {
        light: '#ffd60a',
        main: '#ffc300',
        dark: '#e85d04'
      }
    },
    // Background Colors
    background: {
      primary: '#0a0a0a',
      secondary: '#141414',
      tertiary: '#1a1a1a',
      card: 'rgba(255, 255, 255, 0.05)',
      overlay: 'rgba(0, 0, 0, 0.7)',
    },
    // Text Colors
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
      muted: '#666666'
    },
    // Status Colors
    status: {
      success: '#10B981', // Emerald-500
      error: '#EF4444',   // Red-500
      warning: '#F59E0B', // Amber-500
      info: '#0EA5E9',    // Sky-500
    },
    // Gradient Presets
    gradients: {
      primary: 'linear-gradient(135deg, #7b2cbf 0%, #4361ee 100%)',
      secondary: 'linear-gradient(135deg, #4361ee 0%, #7b2cbf 100%)',
      accent: 'linear-gradient(135deg, #4cc9f0 0%, #7b2cbf 100%)',
      glow: 'radial-gradient(circle at center, rgba(123, 44, 191, 0.5), transparent 70%)',
      overlay: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2))'
    },
    // Glass Effect Presets
    glass: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.1)'
    },
  },
  // Shadow Presets
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    glow: {
      primary: '0 4px 20px -8px rgba(123, 44, 191, 0.5)',
      secondary: '0 4px 20px -8px rgba(67, 97, 238, 0.5)'
    },
  },
}; 