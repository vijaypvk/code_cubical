"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Badge } from "@/app/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Textarea } from "@/app/components/ui/textarea"
import { Plus, Edit, Eye, EyeOff, Cloud, Database, Server } from "lucide-react"

interface Credential {
  id: string
  provider: "aws" | "gcp" | "azure"
  name: string
  maskedKey: string
  status: "active" | "invalid"
  region?: string
  lastUsed: string
}

const mockCredentials: Credential[] = [
  {
    id: "1",
    provider: "aws",
    name: "Production AWS Account",
    maskedKey: "AKIA****XYZ",
    status: "active",
    region: "us-east-1",
    lastUsed: "2 hours ago",
  },
  {
    id: "2",
    provider: "gcp",
    name: "Development GCP Project",
    maskedKey: "ya29****abc",
    status: "active",
    region: "us-central1",
    lastUsed: "1 day ago",
  },
  {
    id: "3",
    provider: "azure",
    name: "Staging Azure Subscription",
    maskedKey: "eyJ0****def",
    status: "invalid",
    region: "eastus",
    lastUsed: "3 days ago",
  },
]

const providerIcons = {
  aws: <Cloud className="h-5 w-5 text-orange-500" />,
  gcp: <Database className="h-5 w-5 text-blue-500" />,
  azure: <Server className="h-5 w-5 text-cyan-500" />,
}

const providerNames = {
  aws: "Amazon Web Services",
  gcp: "Google Cloud Platform",
  azure: "Microsoft Azure",
}

export default function CloudCredentials() {
  const [credentials, setCredentials] = useState<Credential[]>(mockCredentials)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null)
  const [showSecrets, setShowSecrets] = useState<{ [key: string]: boolean }>({})
  const [formData, setFormData] = useState({
    provider: "",
    name: "",
    accessKey: "",
    secretKey: "",
    region: "",
    description: "",
  })

  const handleAddNew = () => {
    setEditingCredential(null)
    setFormData({
      provider: "",
      name: "",
      accessKey: "",
      secretKey: "",
      region: "",
      description: "",
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (credential: Credential) => {
    setEditingCredential(credential)
    setFormData({
      provider: credential.provider,
      name: credential.name,
      accessKey: "",
      secretKey: "",
      region: credential.region || "",
      description: "",
    })
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (editingCredential) {
      // Update existing credential
      setCredentials((prev) =>
        prev.map((cred) =>
          cred.id === editingCredential.id ? { ...cred, name: formData.name, region: formData.region } : cred,
        ),
      )
    } else {
      // Add new credential
      const newCredential: Credential = {
        id: Date.now().toString(),
        provider: formData.provider as "aws" | "gcp" | "azure",
        name: formData.name,
        maskedKey: formData.accessKey.slice(0, 4) + "****" + formData.accessKey.slice(-3),
        status: "active",
        region: formData.region,
        lastUsed: "Just now",
      }
      setCredentials((prev) => [...prev, newCredential])
    }
    setIsDialogOpen(false)
  }

  const toggleSecretVisibility = (credentialId: string) => {
    setShowSecrets((prev) => ({
      ...prev,
      [credentialId]: !prev[credentialId],
    }))
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Cloud Credentials</h1>
            <p className="text-gray-400">Manage your cloud provider access credentials securely</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                <Plus className="h-4 w-4 mr-2" />
                Add New Credential
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingCredential ? "Update Credential" : "Add New Credential"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="provider" className="text-gray-300">
                    Cloud Provider
                  </Label>
                  <Select
                    value={formData.provider}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, provider: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="aws" className="text-white hover:bg-gray-700">
                        Amazon Web Services
                      </SelectItem>
                      <SelectItem value="gcp" className="text-white hover:bg-gray-700">
                        Google Cloud Platform
                      </SelectItem>
                      <SelectItem value="azure" className="text-white hover:bg-gray-700">
                        Microsoft Azure
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Credential Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Production AWS Account"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessKey" className="text-gray-300">
                    Access Key / Client ID
                  </Label>
                  <Input
                    id="accessKey"
                    type="password"
                    value={formData.accessKey}
                    onChange={(e) => setFormData((prev) => ({ ...prev, accessKey: e.target.value }))}
                    placeholder="Enter access key"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secretKey" className="text-gray-300">
                    Secret Key / Client Secret
                  </Label>
                  <Input
                    id="secretKey"
                    type="password"
                    value={formData.secretKey}
                    onChange={(e) => setFormData((prev) => ({ ...prev, secretKey: e.target.value }))}
                    placeholder="Enter secret key"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region" className="text-gray-300">
                    Default Region
                  </Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => setFormData((prev) => ({ ...prev, region: e.target.value }))}
                    placeholder="e.g., us-east-1"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-300">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Additional notes about this credential"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {editingCredential ? "Update" : "Save"} Credential
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Credentials Table */}
        <div className="space-y-4">
          {credentials.map((credential) => (
            <Card
              key={credential.id}
              className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      {providerIcons[credential.provider]}
                      <div>
                        <h3 className="font-semibold text-white">{credential.name}</h3>
                        <p className="text-sm text-gray-400">{providerNames[credential.provider]}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-mono text-gray-300">
                          {showSecrets[credential.id] ? "AKIA1234567890EXAMPLE" : credential.maskedKey}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSecretVisibility(credential.id)}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                        >
                          {showSecrets[credential.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">Last used: {credential.lastUsed}</p>
                    </div>

                    <div className="text-right">
                      <Badge
                        variant={credential.status === "active" ? "default" : "destructive"}
                        className={
                          credential.status === "active"
                            ? "bg-green-900 text-green-300 border-green-800"
                            : "bg-red-900 text-red-300 border-red-800"
                        }
                      >
                        {credential.status}
                      </Badge>
                      {credential.region && <p className="text-xs text-gray-500 mt-1">{credential.region}</p>}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(credential)}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {credentials.length === 0 && (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-12 text-center">
              <Cloud className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-300 mb-2">No credentials configured</h3>
              <p className="text-gray-500 mb-4">Add your first cloud credential to get started</p>
              <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add New Credential
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
