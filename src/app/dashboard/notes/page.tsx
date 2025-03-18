'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function NotesPage() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState([
    { id: 1, title: 'Meeting Notes', content: 'Discussed Q1 goals and project timelines.', createdBy: 'Admin', isPrivate: false, createdAt: '2025-03-10', tags: ['meeting', 'planning'] },
    { id: 2, title: 'Project Ideas', content: 'New ideas for improving customer engagement.', createdBy: session?.user?.name || 'User', isPrivate: true, createdAt: '2025-03-15', tags: ['ideas', 'projects'] },
    { id: 3, title: 'Training Schedule', content: 'Upcoming training sessions for new software.', createdBy: 'HR', isPrivate: false, createdAt: '2025-03-05', tags: ['training', 'schedule'] },
  ]);
  
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    isPrivate: true,
    tags: '',
  });
  
  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = newNote.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    const createdNote = {
      id: notes.length + 1,
      title: newNote.title,
      content: newNote.content,
      createdBy: session?.user?.name || 'User',
      isPrivate: newNote.isPrivate,
      createdAt: new Date().toISOString().split('T')[0],
      tags: tagsArray,
    };
    
    setNotes([...notes, createdNote]);
    setNewNote({
      title: '',
      content: '',
      isPrivate: true,
      tags: '',
    });
    setIsCreating(false);
  };
  
  const getAllTags = () => {
    const tagsSet = new Set<string>();
    notes.forEach(note => {
      note.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  };
  
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag ? note.tags.includes(selectedTag) : true;
    
    return matchesSearch && matchesTag;
  });
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Notes</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex flex-1 items-center">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">Search</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Search notes"
                      type="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={selectedTag || ''}
                    onChange={(e) => setSelectedTag(e.target.value || null)}
                  >
                    <option value="">All Tags</option>
                    {getAllTags().map((tag) => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsCreating(true);
                  setActiveNote(null);
                }}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Note
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="col-span-1 rounded-lg bg-white shadow lg:col-span-1">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-lg font-medium text-gray-900">My Notes</h2>
                  </div>
                  <div className="h-[calc(100vh-300px)] overflow-y-auto">
                    {filteredNotes.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {filteredNotes.map((note) => (
                          <li
                            key={note.id}
                            className={`cursor-pointer px-4 py-4 hover:bg-gray-50 ${activeNote === note.id ? 'bg-indigo-50' : ''}`}
                            onClick={() => {
                              setActiveNote(note.id);
                              setIsCreating(false);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <p className="truncate text-sm font-medium text-indigo-600">{note.title}</p>
                              {note.isPrivate ? (
                                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                  Private
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Shared
                                </span>
                              )}
                            </div>
                            <p className="mt-1 truncate text-sm text-gray-500">{note.content.substring(0, 100)}...</p>
                            <div className="mt-2 flex">
                              {note.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="mr-1 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <p className="mt-2 text-xs text-gray-400">
                              {note.createdAt} by {note.createdBy}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-12 text-center">
                        <p className="text-sm text-gray-500">No notes found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 rounded-lg bg-white shadow lg:col-span-2">
                {isCreating ? (
                  <div className="p-6">
                    <h2 className="mb-4 text-lg font-medium text-gray-900">Create New Note</h2>
                    <form onSubmit={handleNoteSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          id="title"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={newNote.title}
                          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                          id="content"
                          rows={10}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={newNote.content}
                          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                        <input
                          type="text"
                          id="tags"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={newNote.tags}
                          onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                          placeholder="meeting, important, follow-up"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          id="isPrivate"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={newNote.isPrivate}
                          onChange={(e) => setNewNote({ ...newNote, isPrivate: e.target.checked })}
                        />
                        <label htmlFor="isPrivate" className="ml-2 block text-sm text-gray-900">
                          Private note (only visible to you)
                        </label>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsCreating(false)}
                          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                ) : activeNote ? (
                  <div className="p-6">
                    {notes.filter(note => note.id === activeNote).map((note) => (
                      <div key={note.id}>
                        <div className="mb-4 flex items-center justify-between">
                          <h2 className="text-xl font-bold text-gray-900">{note.title}</h2>
                          <div className="flex space-x-2">
                            <button className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-indigo-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                              Edit
                            </button>
                            <button className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                              Delete
                            </button>
                            {note.isPrivate && (
                              <button className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-green-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                Share
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="mb-4 flex items-center text-sm text-gray-500">
                          <span>Created on {note.createdAt} by {note.createdBy}</span>
                          <span className="mx-2">•</span>
                          <span>
                            {note.isPrivate ? (
                              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                Private
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Shared
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="mb-4 flex flex-wrap">
                          {note.tags.map((tag) => (
                            <span
                              key={tag}
                              className="mr-2 mb-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="prose prose-indigo max-w-none">
                          <p className="whitespace-pre-wrap">{note.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-6">
                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No note selected</h3>
                    <p className="mt-1 text-sm text-gray-500">Select a note from the list or create a new one.</p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => setIsCreating(true)}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        New Note
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
