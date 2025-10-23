import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '@/services/supabaseClient'
import { Project, BusinessData } from '@/types/business'

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      
      if (!isSupabaseConfigured()) {
        setError('Supabase is not configured. Please set up your environment variables.')
        setProjects([])
        return
      }

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (businessData: BusinessData) => {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not configured. Please set up your environment variables.')
      }

      const projectData = {
        name: businessData.name,
        business_category: businessData.category,
        business_data: businessData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        version_history: [],
        notes: ''
      }

      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project')
      throw err
    }
  }

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project')
      throw err
    }
  }

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchProjects()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project')
      throw err
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject
  }
}
