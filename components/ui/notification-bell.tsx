"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  avatar?: string
  initials?: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Document Uploaded',
    message: 'Your tax document has been successfully uploaded and processed.',
    time: '2 minutes ago',
    type: 'success',
    read: false,
    initials: 'JD'
  },
  {
    id: '2',
    title: 'Meeting Reminder',
    message: 'You have a meeting with your advisor in 30 minutes.',
    time: '15 minutes ago',
    type: 'info',
    read: false,
    initials: 'AC'
  },
  {
    id: '3',
    title: 'Report Ready',
    message: 'Your quarterly financial report is now available for review.',
    time: '1 hour ago',
    type: 'success',
    read: true,
    initials: 'FR'
  },
  {
    id: '4',
    title: 'Action Required',
    message: 'Please review and approve the pending expense report.',
    time: '2 hours ago',
    type: 'warning',
    read: false,
    initials: 'ER'
  },
  {
    id: '5',
    title: 'New Event Available',
    message: 'Cresset Annual Wealth Summit registration is now open.',
    time: '3 hours ago',
    type: 'info',
    read: false,
    initials: 'EV'
  },
  {
    id: '6',
    title: 'Portfolio Update',
    message: 'Your investment portfolio has been rebalanced based on market conditions.',
    time: '1 day ago',
    type: 'success',
    read: true,
    initials: 'PU'
  },
  {
    id: '7',
    title: 'Benefit Available',
    message: 'New concierge service benefit is now available for your account.',
    time: '2 days ago',
    type: 'info',
    read: false,
    initials: 'BV'
  },
  {
    id: '8',
    title: 'Security Alert',
    message: 'New login detected from a new device. Please verify if this was you.',
    time: '3 days ago',
    type: 'error',
    read: true,
    initials: 'SA'
  }
]

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative p-2">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-6 px-2"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id}
                className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3 w-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {notification.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getTypeColor(notification.type)}`}
                      >
                        {notification.type}
                      </Badge>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        {notifications.length > 0 && (
          <div className="p-3 border-t">
            <Button variant="ghost" size="sm" className="w-full text-sm">
              View all notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 