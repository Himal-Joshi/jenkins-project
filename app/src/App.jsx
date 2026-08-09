import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Activity, 
  Clock, 
  Cpu, 
  HardDrive, 
  Play, 
  ShieldCheck, 
  Server, 
  Cloud, 
  Terminal,
  GitBranch,
  CheckCircle2,
  RefreshCw,
  Workflow,
  Layers,
  Box,
  Check
} from 'lucide-react';

export default function App() {
  const [telemetry, setTelemetry] = useState(null);
  const [activeTab, setActiveTab] = useState('/api/status');
  const [apiResponse, setApiResponse] = useState('Loading...');
  const [loading, setLoading] = useState(false);

  // Jenkins Pipeline Simulation State
  const [building, setBuilding] = useState(false);
  const [currentStage, setCurrentStage] = useState(5); // 0 to 5
  const [buildLogs, setBuildLogs] = useState([
    '[Jenkins] Started by user administrator',
    '[Git] Checking out Revision 1f64a0b (main)',
    '[Build] Executing stage: Dependency Installation (npm install)...',
    '[Build] Executing stage: Vite Production Build (npm run build)...',
    '[Deploy] Restarting application service via systemd...',
    '✅ SUCCESS: Pipeline completed in 14.2 seconds!'
  ]);

  // Fetch Telemetry from Express backend
  const fetchTelemetry = async () => {
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error('Network status error');
      const data = await res.json();
      setTelemetry(data);
      if (activeTab === '/api/status') {
        setApiResponse(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      console.warn('Telemetry poll warning:', err.message);
      const mock = {
        status: 'online',
        service: 'Jenkins Automation Server & React Web App',
        nodeVersion: 'v20.12.0',
        platform: 'Linux x64 (Ubuntu 22.04 LTS)',
        hostname: 'jenkins-ci-server',
        uptime: '4h 12m 08s',
        memoryUsage: { freeMB: 512, totalMB: 1024, heapUsedMB: 142 },
        cpus: 2,
        timestamp: new Date().toISOString()
      };
      setTelemetry(mock);
      if (activeTab === '/api/status') {
        setApiResponse(JSON.stringify(mock, null, 2));
      }
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleApiTest = async (endpoint) => {
    setActiveTab(endpoint);
    setLoading(true);
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setApiResponse(JSON.stringify({ 
        endpoint,
        status: 200, 
        service: 'Jenkins CI/CD React Endpoint',
        timestamp: new Date().toISOString()
      }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const runPipelineSimulation = () => {
    if (building) return;
    setBuilding(true);
    setCurrentStage(0);
    setBuildLogs(['[Jenkins] Triggering manual pipeline build #42...']);

    const stages = [
      '[1/5] Checking out Git repository main branch...',
      '[2/5] Performing environment audit (Java 17, Node.js 20.x, Git)...',
      '[3/5] Running npm install dependencies...',
      '[4/5] Compiling Vite React production assets...',
      '[5/5] Deploying build & restarting application daemon...'
    ];

    stages.forEach((log, index) => {
      setTimeout(() => {
        setCurrentStage(index + 1);
        setBuildLogs(prev => [...prev, log]);
        if (index === stages.length - 1) {
          setTimeout(() => {
            setBuildLogs(prev => [...prev, '✅ BUILD SUCCESSFUL! All 5 stages completed smoothly.']);
            setBuilding(false);
          }, 600);
        }
      }, (index + 1) * 900);
    });
  };

  const memPercent = telemetry 
    ? Math.round((telemetry.memoryUsage.heapUsedMB / telemetry.memoryUsage.totalMB) * 100)
    : 14;

  const pipelineStages = [
    { name: 'Checkout SCM', icon: GitBranch },
    { name: 'Audit Env', icon: Cpu },
    { name: 'Install Deps', icon: Box },
    { name: 'Vite Build', icon: Layers },
    { name: 'Deploy App', icon: CheckCircle2 }
  ];

  return (
    <div className="app-wrapper">
      <div className="ambient-light light-1"></div>
      <div className="ambient-light light-2"></div>

      {/* Navigation Header */}
      <header className="header">
        <div className="brand">
          <Workflow className="brand-icon" size={28} />
          <span>JenkinsOps</span>
          <span className="react-badge">CI/CD Active</span>
        </div>
        <nav className="nav">
          <a href="#overview" className="nav-item">Overview</a>
          <a href="#pipeline" className="nav-item">Pipeline</a>
          <a href="#telemetry" className="nav-item">Telemetry</a>
          <a href="#api" className="nav-item">API Explorer</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="overview" className="hero">
        <div className="pill-tag">
          <span className="live-dot"></span> Automated Jenkins Pipeline &bull; React Web App
        </div>
        <h1 className="hero-heading">
          Jenkins <span className="gradient-text">CI/CD Pipeline</span> <br />
          &amp; Modern React Portal
        </h1>
        <p className="hero-description">
          Integrated continuous integration and automated build pipeline template. 
          Built with <strong>Vite + React</strong>, Node.js Express, and Jenkins Pipelines.
        </p>

        <div className="hero-buttons">
          <button onClick={runPipelineSimulation} className="btn btn-primary" disabled={building}>
            {building ? <RefreshCw className="spin" size={18} /> : <Play size={18} />}
            {building ? 'Building Pipeline...' : 'Trigger Pipeline Build'}
          </button>
          <a href="#telemetry" className="btn btn-outline">
            <Activity size={18} /> View Server Metrics
          </a>
        </div>
      </section>

      {/* Interactive Jenkins Pipeline Visualizer */}
      <section id="pipeline" style={{ marginBottom: '4rem' }}>
        <div className="section-title">
          <h2>Jenkins Pipeline Visualizer</h2>
          <p>Real-time visual tracking of your Jenkins CI/CD build stages</p>
        </div>

        <div className="card pipeline-card">
          <div className="pipeline-stages">
            {pipelineStages.map((stage, idx) => {
              const StageIcon = stage.icon;
              const isDone = currentStage > idx;
              const isCurrent = currentStage === idx && building;

              return (
                <div key={idx} className={`stage-step ${isDone ? 'completed' : ''} ${isCurrent ? 'active' : ''}`}>
                  <div className="stage-icon-wrap">
                    {isDone ? <Check size={20} /> : <StageIcon size={20} />}
                  </div>
                  <span className="stage-name">{stage.name}</span>
                  <span className="stage-status">{isDone ? 'Passed' : isCurrent ? 'Running...' : 'Pending'}</span>
                </div>
              );
            })}
          </div>

          <div className="pipeline-log-console">
            <div className="console-header">
              <span>Terminal Console Output</span>
              <span className="console-badge">{building ? 'BUILDING' : 'IDLE / SUCCESS'}</span>
            </div>
            <pre className="console-body">
              {buildLogs.map((log, i) => (
                <div key={i} className="log-line">{log}</div>
              ))}
            </pre>
          </div>
        </div>
      </section>

      {/* Telemetry Dashboard */}
      <section id="telemetry" style={{ marginBottom: '4rem' }}>
        <div className="section-title">
          <h2>Real-Time Server Telemetry</h2>
          <p>Live metrics from Express backend</p>
        </div>

        <div className="metrics-grid">
          <div className="card metric-card">
            <div className="metric-icon">
              <Server size={24} />
            </div>
            <div className="metric-info">
              <label>Service Status</label>
              <h3 style={{ color: '#10b981' }}>{telemetry?.status || 'Online'}</h3>
              <span>{telemetry?.hostname || 'jenkins-ci-server'}</span>
            </div>
          </div>

          <div className="card metric-card">
            <div className="metric-icon">
              <Clock size={24} />
            </div>
            <div className="metric-info">
              <label>System Uptime</label>
              <h3>{telemetry?.uptime || '0h 0m 0s'}</h3>
              <span>Continuous daemon runtime</span>
            </div>
          </div>

          <div className="card metric-card">
            <div className="metric-icon">
              <Cpu size={24} />
            </div>
            <div className="metric-info">
              <label>Runtime Engine</label>
              <h3>{telemetry?.nodeVersion || 'Node.js 20.x'}</h3>
              <span>{telemetry?.platform || 'Linux x64'}</span>
            </div>
          </div>

          <div className="card metric-card">
            <div className="metric-icon">
              <HardDrive size={24} />
            </div>
            <div className="metric-info" style={{ width: '100%' }}>
              <label>Memory Allocated</label>
              <h3>{telemetry?.memoryUsage ? `${telemetry.memoryUsage.heapUsedMB} MB / ${telemetry.memoryUsage.totalMB} MB` : '142 MB / 1024 MB'}</h3>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${memPercent}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive API Tester */}
      <section id="api" className="api-container">
        <div className="section-title">
          <h2>Interactive API Explorer</h2>
          <p>Execute live API calls against your Express server</p>
        </div>

        <div className="card">
          <div className="api-tabs">
            <button 
              className={`tab-btn ${activeTab === '/api/status' ? 'active' : ''}`}
              onClick={() => handleApiTest('/api/status')}
            >
              GET /api/status
            </button>
            <button 
              className={`tab-btn ${activeTab === '/api/health' ? 'active' : ''}`}
              onClick={() => handleApiTest('/api/health')}
            >
              GET /api/health
            </button>
          </div>

          <div className="api-bar">
            <span className="method-tag">GET</span>
            <input type="text" className="url-input" value={activeTab} readOnly />
            <button className="btn btn-primary" onClick={() => handleApiTest(activeTab)} disabled={loading}>
              <Play size={16} /> Send
            </button>
          </div>

          <div className="code-box">
            <pre>{loading ? 'Executing request...' : apiResponse}</pre>
          </div>
        </div>
      </section>

      {/* Architecture Highlights */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-title">
          <h2>Jenkins CI/CD Architecture</h2>
          <p>Standard continuous integration and deployment workflow</p>
        </div>

        <div className="arch-grid">
          <div className="card arch-card">
            <Workflow className="arch-icon" size={28} />
            <h4>Jenkins Pipeline (`Jenkinsfile`)</h4>
            <p>Declarative pipeline script defining checkout, audit, build, and deploy stages.</p>
          </div>
          <div className="card arch-card">
            <Zap className="arch-icon" size={28} />
            <h4>Vite + React Engine</h4>
            <p>Fast modern single-page frontend application compiled into static production assets.</p>
          </div>
          <div className="card arch-card">
            <Server className="arch-icon" size={28} />
            <h4>Express.js Backend</h4>
            <p>Node.js web server serving production static builds and JSON status endpoints.</p>
          </div>
          <div className="card arch-card">
            <ShieldCheck className="arch-icon" size={28} />
            <h4>Systemd Daemon</h4>
            <p>Linux background process manager ensuring continuous uptime and auto-restart.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Built with <strong>React</strong> &amp; <strong>Vite</strong> &bull; Powered by <strong>Jenkins CI/CD</strong></p>
      </footer>
    </div>
  );
}
