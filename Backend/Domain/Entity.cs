using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    /// <summary>
    /// Base Entity class that enforces an Id on its children.
    /// Based on the Microsoft examples for DDD design.
    /// </summary>
    public abstract class Entity
    {
        public int Id { get; set; }
    }
}
