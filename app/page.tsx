"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Calendar, Trophy, Star, Users, Target } from "lucide-react"
import { ScrollReveal, FadeIn, SlideUp, SlideLeft, SlideRight } from "@/components/scroll-reveal"

export default function TennisCoachPortfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll-based navigation highlighting
  useEffect(() => {
    const sections = ["home", "about", "achievements", "students", "training", "contact"]
    
    const observers = sections.map((sectionId) => {
      const element = document.getElementById(sectionId)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId)
          }
        },
        {
          threshold: 0.3,
          rootMargin: "-20% 0px -20% 0px"
        }
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Thank you for your message! I will get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false) // Close mobile menu after clicking
    }
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "achievements", label: "Achievements" },
    { id: "students", label: "Students" },
    { id: "training", label: "Training" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="font-montserrat font-black text-xl text-primary">Coach Reynaldo</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-primary font-semibold"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                }`}></span>
                <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                }`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-primary font-semibold bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/5"
      >
        <div className="absolute inset-0 bg-[url('/tennisbg.jpg?height=800&width=1200')] bg-cover bg-center opacity-20"></div>
        <FadeIn delay={300}>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <SlideUp delay={500}>
              <h1 className="font-montserrat font-black text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
                Train with Coach <span className="text-primary">Reynaldo Martinez</span>
              </h1>
            </SlideUp>
            <SlideUp delay={700}>
              <p className="font-open-sans text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Elevate Your Game with Professional Tennis Coaching. Personalized training programs for players of all
                levels.
              </p>
            </SlideUp>
            <SlideUp delay={900}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3"
                >
                  Book a Session
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </SlideUp>
          </div>
        </FadeIn>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SlideUp delay={200}>
              <div>
                <h2 className="font-montserrat font-black text-3xl md:text-4xl text-foreground mb-6">
                  About Coach Reynaldo
                </h2>
                <p className="font-open-sans text-muted-foreground mb-6 leading-relaxed">
                  Coach Reynaldo Martinez is a passionate tennis coach helping players of all levels improve their game.
                  With over 40 years of professional coaching experience, he brings dedication, expertise, and
                  personalized training methods to help you reach your tennis goals.
                </p>
                <p className="font-open-sans text-muted-foreground mb-8 leading-relaxed">
                  Whether you're a beginner looking to learn the fundamentals or an advanced player aiming for competitive
                  excellence, Coach Reynaldo provides the guidance and support you need to elevate your performance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="text-center p-4">
                    <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-montserrat font-bold text-sm">Beginner & Advanced</h3>
                    <p className="text-xs text-muted-foreground">Coaching</p>
                  </Card>
                  <Card className="text-center p-4">
                    <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-montserrat font-bold text-sm">Competitive Training</h3>
                    <p className="text-xs text-muted-foreground">Programs</p>
                  </Card>
                  <Card className="text-center p-4">
                    <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-montserrat font-bold text-sm">Personalized Tennis</h3>
                    <p className="text-xs text-muted-foreground">Drills</p>
                  </Card>
                </div>
              </div>
            </SlideUp>
            <SlideUp delay={400}>
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src="/reyImg.jpg"
                    alt="Coach Reynaldo Martinez"
                    className="rounded-lg shadow-2xl w-full max-w-md"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                    <div className="text-center">
                      <div className="font-montserrat font-black text-2xl">40+</div>
                      <div className="text-sm">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="font-montserrat font-black text-3xl md:text-4xl text-center text-foreground mb-12">
              Achievements & Milestones
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            <SlideUp delay={200}>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="font-montserrat font-bold"> Coach In Sofitel Philippine Plaza</CardTitle>
                  <CardDescription>18+ Years</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                  Extensive experience coaching and mentoring players at a prestigious venue.
                  </p>
                </CardContent>
              </Card>
            </SlideUp>

            <SlideUp delay={400}>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="font-montserrat font-bold">Junior Player Development</CardTitle>
                  <CardDescription>Ongoing Success</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Coached 3 junior players to national-level tournaments, showcasing effective training methods.
                  </p>
                </CardContent>
              </Card>
            </SlideUp>

            <SlideUp delay={600}>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="font-montserrat font-bold">Professional Coaching</CardTitle>
                  <CardDescription>40+ Years</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Over a decade of professional coaching experience with players of all skill levels.
                  </p>
                </CardContent>
              </Card>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Student Gallery Section */}
      <section id="students" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="font-montserrat font-black text-3xl md:text-4xl text-center text-foreground mb-6">
              My Students in Action
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              See the progress and dedication of my trainee students. These photos showcase their journey and improvement
              through our training sessions.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Student Photo 1 */}
            <SlideUp delay={200}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <img
                    src="/picture1.jpg?height=300&width=400"
                    alt="Student practicing forehand technique"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-montserrat font-bold text-sm">Forehand Training</h4>
                    <p className="text-xs">Beginner Level Progress</p>
                  </div>
                </div>
              </Card>
            </SlideUp>

            {/* Student Photo 2 */}
            <SlideUp delay={300}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <img
                    src="/picture2.jpg?height=300&width=400"
                    alt="Student practicing serve technique"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-montserrat font-bold text-sm">Serve Technique</h4>
                    <p className="text-xs">Intermediate Training</p>
                  </div>
                </div>
              </Card>
            </SlideUp>

            {/* Student Photo 3 */}
            <SlideUp delay={400}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <img
                    src="/picture3.jpg?height=300&width=400"
                    alt="Group training session with junior players"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-montserrat font-bold text-sm">Group Training</h4>
                    <p className="text-xs">Junior Development</p>
                  </div>
                </div>
              </Card>
            </SlideUp>

            {/* Student Photo 4 */}
            <SlideUp delay={500}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <img
                    src="/picture4.jpg?height=300&width=400"
                    alt="Student working on backhand with coach guidance"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-montserrat font-bold text-sm">Backhand Drills</h4>
                    <p className="text-xs">Technical Improvement</p>
                  </div>
                </div>
              </Card>
            </SlideUp>

            {/* Student Photo 5 */}
            <SlideUp delay={600}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Student celebrating tournament victory"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-montserrat font-bold text-sm">Tournament Success</h4>
                    <p className="text-xs">Competition Ready</p>
                  </div>
                </div>
              </Card>
            </SlideUp>

            {/* Student Photo 6 */}
            <SlideUp delay={700}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Adult student learning proper grip technique"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-montserrat font-bold text-sm">Adult Beginner</h4>
                    <p className="text-xs">Fundamentals Focus</p>
                  </div>
                </div>
              </Card>
            </SlideUp>
          </div>

          {/* Stats Section */}
          <SlideUp delay={800}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="font-montserrat font-black text-3xl text-primary mb-2">20+</div>
                <div className="text-sm text-muted-foreground">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="font-montserrat font-black text-3xl text-primary mb-2">15</div>
                <div className="text-sm text-muted-foreground">Tournament Winners</div>
              </div>
              <div className="text-center">
                <div className="font-montserrat font-black text-3xl text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Improvement Rate</div>
              </div>
              <div className="text-center">
                <div className="font-montserrat font-black text-3xl text-primary mb-2">40+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Training & Location Section */}
      <section id="training" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="font-montserrat font-black text-3xl md:text-4xl text-center text-foreground mb-12">
              Training & Location
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-12">
            <SlideLeft delay={200}>
              <div>
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="font-montserrat font-bold flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Training Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Currently offering sessions at Quezon City Sports Complex, featuring professional-grade courts and
                      excellent facilities for optimal training conditions.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm">Available Mon–Sat, 7 AM – 6 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm">Quezon City Sports Complex</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 mt-6">
                  <CardHeader>
                    <CardTitle className="font-montserrat font-bold">Training Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Badge variant="secondary" className="mr-2">
                        Beginner Fundamentals
                      </Badge>
                      <Badge variant="secondary" className="mr-2">
                        Intermediate Skills
                      </Badge>
                      <Badge variant="secondary" className="mr-2">
                        Advanced Techniques
                      </Badge>
                      <Badge variant="secondary" className="mr-2">
                        Competitive Preparation
                      </Badge>
                      <Badge variant="secondary" className="mr-2">
                        Private Sessions
                      </Badge>
                      <Badge variant="secondary" className="mr-2">
                        Group Training
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SlideLeft>

            <SlideRight delay={400}>
              <div>
                <Card className="p-6 h-full">
                  <CardHeader>
                    <CardTitle className="font-montserrat font-bold">Location Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.8974!2d121.0437!3d14.6760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQwJzMzLjYiTiAxMjHCsDAyJzM3LjMiRQ!5e0!3m2!1sen!2sph!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SlideRight>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="font-montserrat font-black text-3xl md:text-4xl text-center text-foreground mb-12">
              Get In Touch
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <SlideUp delay={200}>
              <div>
                <h3 className="font-montserrat font-bold text-xl mb-6">Ready to Start Training?</h3>
                <p className="text-muted-foreground mb-8">
                  Contact me today to schedule your first session or to learn more about my training programs. I'm here to
                  help you achieve your tennis goals!
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>+63 912 345 6789</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>reynaldo.martinez@email.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Quezon City, Philippines</span>
                  </div>
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={400}>
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="font-montserrat font-bold">Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="font-montserrat font-black text-xl text-primary mb-4">Coach Reynaldo Martinez</div>
            <p className="text-muted-foreground mb-6">Professional Tennis Coaching • Elevate Your Game</p>
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Facebook
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                YouTube
              </a>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 Coach Reynaldo Martinez. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
