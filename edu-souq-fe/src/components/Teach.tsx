

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useCourseStore } from "../store/courseStore"
import { useTranslation } from "react-i18next"
import { useThemeLanguage } from "../contexts/ThemeLanguageContext"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { v4 as uuidv4 } from "uuid"
import { Upload, ChevronRight, BarChart2, MessageCircle, Trash2, Edit, FileText, Image, Video, Search, Send } from "lucide-react"

const courseSchema = z.object({
  title: z.string().min(3, "Le titre doit avoir au moins 3 caractères"),
  description: z.string().min(10, "La description doit être plus longue"),
  content: z.string().min(20, "Le contenu doit être plus détaillé"),
  mediaType: z.enum(["none", "image", "video", "document"]).optional(),
  mediaUrl: z.string().optional(),
})

type CourseForm = z.infer<typeof courseSchema>

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
}

export default function Teach() {
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'stats' | 'chat'>('create')
  const [selectedMediaType, setSelectedMediaType] = useState<'none' | 'image' | 'video' | 'document'>('none')
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [activeChat, setActiveChat] = useState<string | null>('student1')
  const [messageInput, setMessageInput] = useState('')
  const { t } = useTranslation()
  const { theme } = useThemeLanguage()
  
  // Mock messages for the chat interface
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'student1', content: "J'ai une question sur le module 3. Pourriez-vous m'expliquer comment fonctionne la récursivité?", timestamp: new Date(Date.now() - 3600000) },
    { id: '2', sender: 'teacher', content: "Bien sûr ! La récursivité est une technique où une fonction s'appelle elle-même pour résoudre un problème. C'est très utile pour les structures de données comme les arbres ou pour diviser un problème complexe en sous-problèmes plus simples.", timestamp: new Date(Date.now() - 3500000) },
    { id: '3', sender: 'student1', content: "Merci pour l'explication ! Pourriez-vous me donner un exemple concret ?", timestamp: new Date(Date.now() - 3400000) },
  ])
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CourseForm>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      mediaType: 'none',
      mediaUrl: '',
    }
  })

  const { courses, addCourse, removeCourse } = useCourseStore((state) => ({
    courses: state.courses,
    addCourse: state.addCourse,
    removeCourse: state.removeCourse,
  }))

  const onSubmit = (data: CourseForm) => {
    // Form validation is handled by zod, so we don't need to check manually
    
    const courseData = {
      id: selectedCourse || uuidv4(),
      ...data,
      mediaType: selectedMediaType,
    }
    
    addCourse(courseData)
    reset()
    setSelectedMediaType('none')
    setSelectedCourse(null)
    
    // Switch to manage tab to show the newly added course
    setActiveTab('manage')
  }
  
  const handleMediaTypeChange = (type: 'none' | 'image' | 'video' | 'document') => {
    setSelectedMediaType(type)
    setValue('mediaType', type)
  }
  
  const handleDeleteCourse = (id: string) => {
    removeCourse(id)
  }
  
  const handleEditCourse = (course: any) => {
    setSelectedCourse(course.id)
    setActiveTab('create')
    reset({
      title: course.title,
      description: course.description,
      content: course.content,
      mediaType: course.mediaType || 'none',
      mediaUrl: course.mediaUrl || '',
    })
    setSelectedMediaType(course.mediaType || 'none')
  }
  
  const handleSendMessage = () => {
    if (messageInput.trim() === '') return
    
    const newMessage: Message = {
      id: uuidv4(),
      sender: 'teacher',
      content: messageInput,
      timestamp: new Date(),
    }
    
    setMessages([...messages, newMessage])
    setMessageInput('')
  }

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-xl overflow-hidden mb-8">
          <div className="flex flex-wrap border-b border-light-border dark:border-dark-border">
            <button
              onClick={() => setActiveTab('create')}
              className={`flex items-center px-6 py-4 font-medium transition-colors ${activeTab === 'create' ? 'text-primary border-b-2 border-primary' : 'text-light-textSecondary dark:text-dark-textSecondary hover:text-primary'}`}
            >
              <Upload className="mr-2 h-5 w-5" />
              {t('common.teach')}
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`flex items-center px-6 py-4 font-medium transition-colors ${activeTab === 'manage' ? 'text-primary border-b-2 border-primary' : 'text-light-textSecondary dark:text-dark-textSecondary hover:text-primary'}`}
            >
              <FileText className="mr-2 h-5 w-5" />
              Gérer mes cours
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center px-6 py-4 font-medium transition-colors ${activeTab === 'stats' ? 'text-primary border-b-2 border-primary' : 'text-light-textSecondary dark:text-dark-textSecondary hover:text-primary'}`}
            >
              <BarChart2 className="mr-2 h-5 w-5" />
              Statistiques
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center px-6 py-4 font-medium transition-colors ${activeTab === 'chat' ? 'text-primary border-b-2 border-primary' : 'text-light-textSecondary dark:text-dark-textSecondary hover:text-primary'}`}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat étudiants
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'create' && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
                  {selectedCourse ? 'Modifier le cours' : 'Créer un nouveau cours'}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">Titre du cours</label>
                      <Input 
                        {...register("title")} 
                        placeholder="Ex: Introduction à la programmation Python" 
                        className="bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border focus:border-primary focus:ring-primary text-light-text dark:text-dark-text"
                      />
                      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">Description courte</label>
                      <Input 
                        {...register("description")} 
                        placeholder="Une brève description qui apparaîtra dans les résultats de recherche" 
                        className="bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border focus:border-primary focus:ring-primary text-light-text dark:text-dark-text"
                      />
                      {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">Contenu détaillé du cours</label>
                    <Textarea 
                      {...register("content")} 
                      placeholder="Décrivez en détail le contenu de votre cours..." 
                      rows={8} 
                      className="bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border focus:border-primary focus:ring-primary text-light-text dark:text-dark-text"
                    />
                    {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-3">Média du cours</label>
                    <div className="flex flex-wrap gap-4">
                      <button
                        type="button"
                        onClick={() => handleMediaTypeChange('none')}
                        className={`flex items-center px-4 py-3 rounded-lg border-2 transition-all ${selectedMediaType === 'none' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'}`}
                      >
                        <span className="font-medium">Aucun média</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => handleMediaTypeChange('image')}
                        className={`flex items-center px-4 py-3 rounded-lg border-2 transition-all ${selectedMediaType === 'image' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'}`}
                      >
                        <Image className="mr-2 h-5 w-5" />
                        <span className="font-medium">Image</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => handleMediaTypeChange('video')}
                        className={`flex items-center px-4 py-3 rounded-lg border-2 transition-all ${selectedMediaType === 'video' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'}`}
                      >
                        <Video className="mr-2 h-5 w-5" />
                        <span className="font-medium">Vidéo</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => handleMediaTypeChange('document')}
                        className={`flex items-center px-4 py-3 rounded-lg border-2 transition-all ${selectedMediaType === 'document' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'}`}
                      >
                        <FileText className="mr-2 h-5 w-5" />
                        <span className="font-medium">Document</span>
                      </button>
                    </div>
                    
                    {selectedMediaType !== 'none' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">URL du {selectedMediaType}</label>
                        <Input 
                          {...register("mediaUrl")} 
                          placeholder={`Entrez l'URL de votre ${selectedMediaType}...`} 
                          className="bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border focus:border-primary focus:ring-primary text-light-text dark:text-dark-text"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      {selectedCourse ? 'Mettre à jour le cours' : 'Publier le cours'}
                    </Button>
                  </div>
                </form>
              </div>
            )
}
            
            {activeTab === 'manage' && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">Gérer mes cours</h2>
                
                {courses.length === 0 ? (
                  <div className="text-center py-12 bg-light-background dark:bg-dark-background rounded-lg border border-dashed border-light-border dark:border-dark-border">
                    <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">Vous n'avez pas encore créé de cours</p>
                    <Button 
                      onClick={() => setActiveTab('create')} 
                      variant="primary"
                      className="bg-primary hover:bg-primary/90"
                    >
                      Créer mon premier cours
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {courses.map((course) => (
                      <Card key={course.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 bg-gradient-to-br from-blue-100 to-indigo-100 p-6 flex items-center justify-center">
                            {course.mediaType === 'image' && <Image className="h-16 w-16 text-blue-500" />}
                            {course.mediaType === 'video' && <Video className="h-16 w-16 text-blue-500" />}
                            {course.mediaType === 'document' && <FileText className="h-16 w-16 text-blue-500" />}
                            {(!course.mediaType || course.mediaType === 'none') && <FileText className="h-16 w-16 text-blue-500" />}
                          </div>
                          
                          <div className="p-6 md:w-3/4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleEditCourse(course)}
                                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                >
                                  <Edit className="h-5 w-5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteCourse(course.id)}
                                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{course.description}</p>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  0 étudiants
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Actif
                                </span>
                              </div>
                              
                              <button className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                                Voir détails
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )
}
              </div>
            )
}
            
            {activeTab === 'stats' && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">Statistiques de participation</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="p-6 border border-gray-200 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-light-text dark:text-dark-text">Total Étudiants</h3>
                      <div className="p-2 bg-blue-100 rounded-full">
                        <BarChart2 className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-light-text dark:text-dark-text">124</p>
                    <p className="text-sm text-green-600 mt-2">+12% depuis le mois dernier</p>
                  </Card>
                  
                  <Card className="p-6 border border-gray-200 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-light-text dark:text-dark-text">Cours Actifs</h3>
                      <div className="p-2 bg-indigo-100 rounded-full">
                        <FileText className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-light-text dark:text-dark-text">{courses.length}</p>
                    <p className="text-sm text-green-600 mt-2">+3 nouveaux cours</p>
                  </Card>
                  
                  <Card className="p-6 border border-gray-200 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-light-text dark:text-dark-text">Taux d'engagement</h3>
                      <div className="p-2 bg-green-100 rounded-full">
                        <MessageCircle className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-light-text dark:text-dark-text">87%</p>
                    <p className="text-sm text-green-600 mt-2">+5% depuis le mois dernier</p>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 border border-gray-200 hover:shadow-lg transition-all">
                    <h3 className="text-lg font-medium text-light-text dark:text-dark-text mb-4">Cours les plus populaires</h3>
                    <div className="space-y-4">
                      {courses.length > 0 ? courses.slice(0, 3).map((course, index) => (
                        <div key={course.id} className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div className="ml-4">
                            <h4 className="text-light-text dark:text-dark-text font-medium">{course.title}</h4>
                            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">{course.description.substring(0, 60)}...</p>
                          </div>
                          <div className="ml-auto">
                            <span className="text-blue-600 font-bold">42</span>
                            <span className="text-gray-500 text-sm"> étudiants</span>
                          </div>
                        </div>
                      )) : (
                        <p className="text-gray-500">Aucun cours disponible</p>
                      )
}
                    </div>
                  </Card>
                  
                  <Card className="p-6 border border-gray-200 hover:shadow-lg transition-all">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Activité récente</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <MessageCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-800">Nouveau commentaire sur <span className="font-medium">Introduction à Python</span></p>
                          <p className="text-sm text-gray-500">Il y a 2 heures</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <BarChart2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-800">5 nouveaux étudiants inscrits à vos cours</p>
                          <p className="text-sm text-gray-500">Il y a 1 jour</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-800">Cours <span className="font-medium">Design UX/UI</span> complété à 100%</p>
                          <p className="text-sm text-gray-500">Il y a 3 jours</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )
}
            
            {activeTab === 'chat' && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">Chat avec les étudiants</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-4 bg-light-background dark:bg-dark-background border-b border-light-border dark:border-dark-border">
                      <h3 className="font-medium text-light-text dark:text-dark-text">Conversations</h3>
                      <div className="relative mt-2">
                        <Input placeholder="Rechercher..." className="pl-8 bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text" />
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-light-textSecondary dark:text-dark-textSecondary" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="overflow-y-auto h-[calc(600px - 64px)]">
                      <div 
                        className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${activeChat === 'student1' ? 'bg-blue-50' : ''}`}
                        onClick={() => setActiveChat('student1')}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            SM
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium text-light-text dark:text-dark-text">Sarah Morin</h4>
                            <p className="text-sm text-gray-500 truncate">J'ai une question sur le module 3...</p>
                          </div>
                          <div className="ml-auto text-xs text-gray-500">14:32</div>
                        </div>
                      </div>
                      
                      <div 
                        className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${activeChat === 'student2' ? 'bg-blue-50' : ''}`}
                        onClick={() => setActiveChat('student2')}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                            JD
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium text-gray-800">Jean Dupont</h4>
                            <p className="text-sm text-gray-500 truncate">Merci pour votre réponse!</p>
                          </div>
                          <div className="ml-auto text-xs text-gray-500">Hier</div>
                        </div>
                      </div>
                      
                      <div 
                        className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${activeChat === 'student3' ? 'bg-blue-50' : ''}`}
                        onClick={() => setActiveChat('student3')}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                            AL
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium text-gray-800">Ahmed Laabi</h4>
                            <p className="text-sm text-gray-500 truncate">Est-ce que vous pourriez expliquer...</p>
                          </div>
                          <div className="ml-auto text-xs text-gray-500">Lun</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2 border rounded-lg overflow-hidden flex flex-col">
                    <div className="p-4 bg-light-background dark:bg-dark-background border-b border-light-border dark:border-dark-border flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                        SM
                      </div>
                      <div>
                        <h4 className="font-medium text-light-text dark:text-dark-text">Sarah Morin</h4>
                        <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">En ligne</p>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-4 overflow-y-auto bg-light-background dark:bg-dark-background">
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div key={msg.id} className={`flex ${msg.sender === 'teacher' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] rounded-lg p-3 ${msg.sender === 'teacher' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'}`}>
                              <p>{msg.content}</p>
                              <p className={`text-xs mt-1 ${msg.sender === 'teacher' ? 'text-blue-100' : 'text-gray-500'}`}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 border-t border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
                      <div className="flex items-center">
                        <Input 
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          placeholder="Tapez votre message ici..."
                          className="flex-1 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button 
                          onClick={handleSendMessage}
                          className="ml-2 bg-primary hover:bg-primary/90 p-2 rounded-full"
                        >
                          <Send className="h-5 w-5 text-white" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
}
          </div>
        </div>
      </div>
    </div>
  )
}

