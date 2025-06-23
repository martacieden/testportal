"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

// Types for the settings structure
export interface ProfileSettings {
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: File | null
}

export interface SecuritySettings {
  twoFactorEnabled: boolean
  biometricEnabled: boolean
  passwordChange: {
    current: string
    new: string
    confirm: string
  }
}

export interface NotificationPreferences {
  portfolioUpdates: boolean
  meetingReminders: boolean
  documentUploads: boolean
  taskDeadlines: boolean
  marketInsights: boolean
  securityAlerts: boolean
}

export interface NotificationSettings {
  email: boolean
  sms: boolean
  preferences: NotificationPreferences
}

export interface DocumentVerification {
  file: File | null
  verified: boolean
  status: 'pending' | 'verified' | 'rejected'
}

export interface DocumentSettings {
  driversLicense: DocumentVerification
  passport: DocumentVerification
}

export interface SettingsState {
  profile: ProfileSettings
  security: SecuritySettings
  notifications: NotificationSettings
  documents: DocumentSettings
}

interface SettingsContextType {
  settings: SettingsState
  updateProfile: (profile: Partial<ProfileSettings>) => void
  updateSecurity: (security: Partial<SecuritySettings>) => void
  updateNotifications: (notifications: Partial<NotificationSettings>) => void
  updateDocuments: (documents: Partial<DocumentSettings>) => void
  resetSettings: () => void
  saveSettings: () => Promise<void>
  isLoading: boolean
  hasUnsavedChanges: boolean
}

const defaultSettings: SettingsState = {
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: null
  },
  security: {
    twoFactorEnabled: false,
    biometricEnabled: false,
    passwordChange: {
      current: '',
      new: '',
      confirm: ''
    }
  },
  notifications: {
    email: true,
    sms: false,
    preferences: {
      portfolioUpdates: true,
      meetingReminders: true,
      documentUploads: true,
      taskDeadlines: true,
      marketInsights: false,
      securityAlerts: true
    }
  },
  documents: {
    driversLicense: {
      file: null,
      verified: false,
      status: 'pending'
    },
    passport: {
      file: null,
      verified: false,
      status: 'pending'
    }
  }
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user-settings')
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings
    }
    return defaultSettings
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Update functions
  const updateProfile = (profile: Partial<ProfileSettings>) => {
    setSettings(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profile }
    }))
    setHasUnsavedChanges(true)
  }

  const updateSecurity = (security: Partial<SecuritySettings>) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, ...security }
    }))
    setHasUnsavedChanges(true)
  }

  const updateNotifications = (notifications: Partial<NotificationSettings>) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, ...notifications }
    }))
    setHasUnsavedChanges(true)
  }

  const updateDocuments = (documents: Partial<DocumentSettings>) => {
    setSettings(prev => ({
      ...prev,
      documents: { ...prev.documents, ...documents }
    }))
    setHasUnsavedChanges(true)
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    setHasUnsavedChanges(false)
  }

  const saveSettings = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user-settings', JSON.stringify(settings))
      }
      
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error('Failed to save settings:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-save to localStorage on changes
  useEffect(() => {
    if (typeof window !== 'undefined' && !hasUnsavedChanges) {
      localStorage.setItem('user-settings', JSON.stringify(settings))
    }
  }, [settings, hasUnsavedChanges])

  return (
    <SettingsContext.Provider value={{
      settings,
      updateProfile,
      updateSecurity,
      updateNotifications,
      updateDocuments,
      resetSettings,
      saveSettings,
      isLoading,
      hasUnsavedChanges
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
} 