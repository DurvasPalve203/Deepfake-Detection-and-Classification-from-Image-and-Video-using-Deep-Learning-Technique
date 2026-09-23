import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalysisResult } from '../../types/analysis';
import { formatDate, getVerdictBadgeClasses, getVerdictLabel } from '../../utils/formatters';
import { Image, Video, Mic, ExternalLink, Trash2, FileText, Search, Filter, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';
import { useAnalysisContext } from '../../context/AnalysisContext';
import { useToast } from '../../context/ToastContext';

interface ActivityTableProps {
  analyses?: AnalysisResult[];
  limit?: number;
  showFilters?: boolean;
}

export const ActivityTable: React.FC<ActivityTableProps> = ({
  analyses: propAnalyses,
  limit,
  showFilters = false,
}) => {
  const { analyses: contextAnalyses, deleteAnalysis } = useAnalysisContext();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedVerdict, setSelectedVerdict] = useState<string>('ALL');

  const sourceAnalyses = propAnalyses || contextAnalyses;

  // Filter logic
  const filtered = sourceAnalyses.filter(item => {
    const matchesSearch =
      item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sha256Hash.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'ALL' || item.mediaType === selectedType;
    const matchesVerdict = selectedVerdict === 'ALL' || item.prediction === selectedVerdict;

    return matchesSearch && matchesType && matchesVerdict;
  });

  const displayList = limit ? filtered.slice(0, limit) : filtered;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'IMAGE':
        return <Image className="w-3.5 h-3.5 text-cyan-400" />;
      case 'VIDEO':
        return <Video className="w-3.5 h-3.5 text-indigo-400" />;
      case 'AUDIO':
        return <Mic className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return null;
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    deleteAnalysis(id);
    showToast('info', 'Record Removed', `Analysis record for ${name} removed from workspace.`, 2500);
  };

  return (
    <div className="space-y-4">
      {/* Optional Filters Bar */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by filename, analysis ID, or SHA-256 hash..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Media Types</option>
              <option value="IMAGE">Image Only</option>
              <option value="VIDEO">Video Only</option>
              <option value="AUDIO">Audio Only</option>
            </select>

            <select
              value={selectedVerdict}
              onChange={e => setSelectedVerdict(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Verdicts</option>
              <option value="AUTHENTIC">Authentic</option>
              <option value="LIKELY_MANIPULATED">Manipulated</option>
              <option value="INCONCLUSIVE">Inconclusive</option>
            </select>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="rounded-2xl border border-slate-800 bg-[#10131B] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 font-semibold">Media Item</th>
                <th className="py-3.5 px-4 font-semibold">Type</th>
                <th className="py-3.5 px-4 font-semibold">Forensic Verdict</th>
                <th className="py-3.5 px-4 font-semibold">Confidence</th>
                <th className="py-3.5 px-4 font-semibold">Analyzed Date</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {displayList.length > 0 ? (
                displayList.map(item => {
                  const badgeClasses = getVerdictBadgeClasses(item.prediction);
                  return (
                    <tr
                      key={item.id}
                      onClick={() => navigate(`/result/${item.id}`)}
                      className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                    >
                      {/* Media details */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0 flex items-center justify-center">
                            {item.mediaType === 'IMAGE' && item.fileMetadata.previewUrl ? (
                              <img
                                src={item.fileMetadata.previewUrl}
                                alt={item.filename}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              getTypeIcon(item.mediaType)
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-200 truncate group-hover:text-cyan-300 transition-colors">
                              {item.filename}
                            </p>
                            <span className="text-[10px] font-mono text-slate-400">
                              ID: {item.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Type badge */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                          {getTypeIcon(item.mediaType)}
                          <span>{item.mediaType}</span>
                        </span>
                      </td>

                      {/* Verdict */}
                      <td className="py-3.5 px-4">
                        <span
                          className={clsx(
                            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
                            badgeClasses.badge
                          )}
                        >
                          <span className={clsx('w-1.5 h-1.5 rounded-full', badgeClasses.dot)} />
                          <span>{getVerdictLabel(item.prediction)}</span>
                        </span>
                      </td>

                      {/* Confidence Meter Pill */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${item.confidence}%` }}
                              className={clsx(
                                'h-full rounded-full',
                                item.prediction === 'AUTHENTIC'
                                  ? 'bg-emerald-400'
                                  : item.prediction === 'LIKELY_MANIPULATED'
                                  ? 'bg-rose-400'
                                  : 'bg-amber-400'
                              )}
                            />
                          </div>
                          <span className="font-mono font-bold text-slate-200">
                            {item.confidence}%
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                        {formatDate(item.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              navigate(`/result/${item.id}`);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                            title="Inspect Forensic Result"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button
                            onClick={e => handleDelete(e, item.id, item.filename)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <ShieldCheck className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-300">No forensic records found</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Upload media or adjust filters to inspect analyses.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
